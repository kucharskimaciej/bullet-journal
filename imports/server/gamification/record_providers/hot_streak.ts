import {GamificationRecords} from '../../../collections/gamification/collection';
import {KEYS, SUBJECT} from '../constants';
import {getRecordOfType, getDayStart, getNextDayStart, isPreviousDay} from '../record_helpers';
import {ISubject, IPostSubjectPayload} from "../subjects";
import {Posts} from "../../../collections/posts/posts";

const getRecord = getRecordOfType(KEYS.HOT_STREAK);

export class HotStreakRecordProvider {
    private key = KEYS.HOT_STREAK;

    notify(subject:ISubject<IPostSubjectPayload>):any {
        switch (subject.type) {
            case SUBJECT.CREATE_POST:
                return this.onCreatePost(subject);
            case SUBJECT.REMOVE_POST:
                return this.onRemovePost(subject);
        }

    }

    private onCreatePost(subject: ISubject<IPostSubjectPayload>) {
        const {user_id} = subject.payload;
        const record = getRecord(user_id);

        const today = getDayStart();

        if (record) {
            // nth post today
            if (record.value.end === today) {
                return;
            }

            // continue streak
            if (isPreviousDay(record.value.end, today)) {
                return GamificationRecords.update(record._id, {
                    $set: {
                        'value.end': today
                    }
                });
            }

            // start a new streak today
            return GamificationRecords.update(record._id, {
                $set: {
                    'value.end': today,
                    'value.start': today
                }
            });
        } else {
            this.getCurrentStreak(user_id);
        }
    }

    private onRemovePost(subject: ISubject<IPostSubjectPayload>) {
        const {user_id, post} = subject.payload;
        const record = getRecord(user_id);

        if (record) {

            // post was in previous streak
            if (post.created_at < record.value.start) {
                return;
            }

            const sameDayPosts = Posts.find({
                created_at: {
                    $gte: getDayStart(post.created_at),
                    $lt: getNextDayStart(post.created_at)
                }
            }).count();

            // post in streak, but there was at least one post on the same day
            if (sameDayPosts > 0) {
                return;
            }

            GamificationRecords.update(record._id, {
                $set: {
                    'value.start': getNextDayStart(post.created_at)
                }
            });
        } else {
            this.getCurrentStreak(user_id);
        }
    }

    private getCurrentStreak(user_id: string) {
        const postsByUser = Posts.find({
            author: user_id
        }, {
            sort: [['created_at', 'desc']]
        }).fetch();

        const streakEnd = getDayStart();
        let streakStart = getDayStart();

        for (let post of postsByUser) {
            const postDate = getDayStart(post.created_at);

            // streak is broken
            if (postDate !== streakStart && !isPreviousDay(postDate, streakStart)) {
                break;
            }

            streakStart = postDate;
        }

        return GamificationRecords.insert({
            key: this.key,
            user_id,
            value: {
                start: streakStart,
                end: streakEnd
            }
        });
    }
}