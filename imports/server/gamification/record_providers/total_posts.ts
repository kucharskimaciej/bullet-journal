import {GamificationRecords} from '../../../collections/gamification/collection';
import {KEYS, SUBJECT} from '../constants';
import {getRecord} from '../record_helpers';
import {ISubject, IPostSubjectPayload} from "../subjects";
import {AbstractRecordProvider} from './record_provider_base';
import {Posts} from "../../../collections/posts/posts";

export class TotalPostsRecordProvider extends AbstractRecordProvider {
    private key = KEYS.TOTAL_POSTS;
    
    private incrementPostCount: (subject: ISubject<IPostSubjectPayload>) => void;
    private decrementPostCount: (subject: ISubject<IPostSubjectPayload>) => void;
    
    constructor() {
        this.incrementPostCount = this.updateRecord(1);
        this.decrementPostCount = this.updateRecord(1);
    }
    
    notify(subject: ISubject<IPostSubjectPayload>) {
        switch (subject.type) {
            case SUBJECT.CREATE_POST:
                return this.onCreatePost(subject);
            case SUBJECT.REMOVE_POST:
                return this.onRemovePost(subject);
        }

    }

    protected onCreatePost(subject: ISubject<IPostSubjectPayload>) {
        return this.incrementPostCount(subject);
    }

    protected onRemovePost(subject: ISubject<IPostSubjectPayload>) {
        return this.decrementPostCount(subject);
    }

    private updateRecord(val) {
        return (subject: ISubject<IPostSubjectPayload>) => {
            const {user_id} = subject.payload;
            const record = getRecord(this.key, user_id);

            if (record) {
                GamificationRecords.update(record._id, {
                    $inc: { value: val }
                });
            } else {
                this.createFromScratch(user_id);
            }
        };
    }

    protected createFromScratch(user_id: string): void {
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
}

