import {GamificationRecords} from '../../../collections/gamification/collection';
import {KEYS, SUBJECT} from '../constants';
import {getRecord} from '../record_helpers';
import {ISubject, IPostSubjectPayload} from "../subjects";
import {Posts} from "../../../collections/posts/posts";

import * as moment from 'moment';

export default class BusiestDayRecordProvider {
    private key = KEYS.BUSIEST_DAY;

    notify(subject: ISubject<IPostSubjectPayload>) {
        switch (subject.type) {
            case SUBJECT.CREATE_POST:
                return this.onCreatePost(subject);
            case SUBJECT.REMOVE_POST:
                return this.onRemovePost(subject);
        }

    }

    private onCreatePost(subject) {
        const {user_id} = subject.payload;
        const record = getRecord(this.key, user_id);

        if (record) {
            const today = moment().startOf('day').valueOf();

            if (record.value.date === today) {
                return GamificationRecords.update(record._id, {
                    $inc: { 'value.count': 1 }
                });
            } else {
                const todaysPostsCount = Posts.find({
                    created_at: {
                        $gte: today
                    }
                }).count();

                return GamificationRecords.update(record._id, {
                    $set: {
                        value: {
                            count: todaysPostsCount,
                            date: today
                        }
                    }
                });
            }
        }
    }

    private createRecordFromScratch(user_id:string) {
        
    }

    onRemovePost(subject) {
        const {user_id, post} = subject.payload;
    }

    private updateRecord(val) {
        return (subject) => {
            const {user_id} = subject.payload;
            const record = getRecord(this.key, user_id);

            if (record) {
                GamificationRecords.update(record._id, {
                    $inc: { value: val }
                });
            } else {
                const postsByUser: number = Posts.find({
                    author: user_id,
                    removed: {
                        $exists: false
                    }
                }).count();

                GamificationRecords.insert({
                    user_id,
                    key: this.key,
                    value: postsByUser
                });
            }
        };
    }
}

