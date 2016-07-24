import {IGamificationRecord, GamificationRecords} from '../../../collections/gamification/collection';
import {KEYS, SUBJECT} from '../constants';
import {getRecord} from '../record_helpers';
import {ISubject, IPostSubjectPayload} from "../subjects";
import {Posts} from "../../../collections/posts/posts";

export class TotalPostsRecordProvider {
    private key = KEYS.TOTAL_POSTS;
    
    notify(subject: ISubject<IPostSubjectPayload>) {
        switch (subject.type) {
            case SUBJECT.CREATE_POST:
                return this.onCreatePost(subject);
            case SUBJECT.REMOVE_POST:
                return this.onRemovePost(subject);
        }

    }

    onCreatePost = this.updateRecord(1);
    onRemovePost = this.updateRecord(-1);

    updateRecord(val) {
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

