import {GamificationRecords} from '../../../collections/gamification/collection';
import {KEYS, SUBJECT} from '../constants';
import {getRecord, getDayStart} from '../record_helpers';
import {ISubject, IPostSubjectPayload} from "../subjects";
import {AbstractRecordProvider} from './record_provider_base';
import {Posts} from "../../../collections/posts/posts";

export class BusiestDayRecordProvider extends AbstractRecordProvider {
    private key = KEYS.BUSIEST_DAY;

    notify(subject: ISubject<IPostSubjectPayload>) {
        switch (subject.type) {
            case SUBJECT.CREATE_POST:
                return this.onCreatePost(subject);
            case SUBJECT.REMOVE_POST:
                return this.onRemovePost(subject);
        }

    }

    protected onCreatePost(subject): any {
        const {user_id} = subject.payload;
        const record = getRecord(this.key, user_id);
        if (!record) {
            return this.createFromScratch(user_id);
        }

        const today = getDayStart();

        if (record.value.date === today) {
            GamificationRecords.update(record._id, {
                $inc: { 'value.count': 1 }
            });
        } else {
            const todaysPostsCount = Posts.find({
                created_at: {
                    $gte: today
                }
            }).count();

            GamificationRecords.update(record._id, {
                $set: {
                    value: {
                        count: todaysPostsCount,
                        date: today
                    }
                }
            });
        }
    }

    protected createFromScratch(user_id:string) {
        const result = Posts.getPostCountByDate(user_id,
            {
                $sort: {
                    count: -1
                }
            },
            { $limit: 1 }
        );

        if (result && result.length) {
            GamificationRecords.insert({
                user_id,
                key: this.key,
                value: result[0]
            });
        }
    }

    protected onRemovePost(subject):any {
        const {user_id} = subject.payload;

        GamificationRecords.remove({
            key: this.key,
            user_id
        });

        this.createFromScratch(user_id);
    }
}

