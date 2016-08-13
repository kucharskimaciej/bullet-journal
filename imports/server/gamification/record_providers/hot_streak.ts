import {GamificationRecords} from '../../../collections/gamification/collection';
import {KEYS, SUBJECT} from '../constants';
import {
    getRecordOfType,
    getDayStart,
    getNextDayStart,
    isPreviousDay,
    isSameDay,
    parseString} from '../record_helpers';
import {ISubject, IPostSubjectPayload} from "../subjects";
import {AbstractRecordProvider} from './record_provider_base';
import {Posts} from "../../../collections/posts/posts";

const getRecord = getRecordOfType(KEYS.HOT_STREAK);

export class HotStreakRecordProvider extends AbstractRecordProvider {
    private key = KEYS.HOT_STREAK;

    notify(subject:ISubject<IPostSubjectPayload>):any {
        switch (subject.type) {
            case SUBJECT.CREATE_POST:
                return this.onCreatePost(subject);
            case SUBJECT.REMOVE_POST:
                return this.onRemovePost(subject);
        }

    }

    protected onCreatePost(subject: ISubject<IPostSubjectPayload>) {
        const {user_id} = subject.payload;
        const record = getRecord(user_id);

        const today = getDayStart();

        if (record) {
            // nth post today
            if (isSameDay(record.value.end, today)) {
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
            this.createFromScratch(user_id);
        }
    }

    protected onRemovePost(subject: ISubject<IPostSubjectPayload>) {
        const {user_id, post} = subject.payload;
        const record = getRecord(user_id);

        if (record) {
            // post was in previous streak
            if (getDayStart(post.created_at) < record.value.start) {
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
            this.createFromScratch(user_id);
        }
    }

    protected createFromScratch(user_id: string) {
        GamificationRecords.remove({
            user_id, key: this.key
        });

        const postsByUser = Posts.getPostCountByDate(user_id, {
                $sort: {
                    date: -1
                }
            });

        let start = getDayStart();
        const end = getDayStart();

        for (let post of postsByUser) {
            const postDate = parseString(post.date);

            if (!isSameDay(postDate, start) && !isPreviousDay(postDate, start)) {
                break;
            }

            start = postDate;
        }

        GamificationRecords.insert({
            user_id,
            key: this.key,
            value: {
                start, end
            }
        });
    }
}