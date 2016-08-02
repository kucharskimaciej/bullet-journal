import {KEYS, SUBJECT} from '../constants';
import {ISubject, IPostSubjectPayload} from "../subjects";
import {AbstractRecordProvider} from './record_provider_base';
import {getDayStart, getLast30DaysStart, ISubjectHandler} from '../record_helpers';
import {Posts} from "../../../collections/posts/posts";
import {GamificationGrid} from '../../../collections/gamification/collection';
import {Meteor} from 'meteor/meteor';


export class PostGridProvider extends AbstractRecordProvider {
    private key = KEYS.POST_GRID;

    private addToGrid: ISubjectHandler<IPostSubjectPayload>;
    private removeFromGrid: ISubjectHandler<IPostSubjectPayload>;

    constructor() {
        super();
        this.addToGrid = this.updateGrid(1);
        this.removeFromGrid = this.updateGrid(-1);
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
        return this.addToGrid(subject);
    }

    protected onRemovePost(subject: ISubject<IPostSubjectPayload>) {
        return this.removeFromGrid(subject);
    }

    private updateGrid(value: number) {
        const modifier = {
            $inc: {
                count: value
            }
        };

        const options = {
            upsert: true
        };

        return (subject: ISubject<IPostSubjectPayload>) => {
            const {user_id, post} = subject.payload;

            GamificationGrid.update({
                key: this.key,
                user_id,
                date: getDayStart(post.created_at)
            }, modifier, options);
        };
    }

    protected createFromScratch(user_id: string) {
        const postCountByDay = (Posts as any).aggregate([
            {
                $match: {
                    author: user_id,
                    removed: {
                        $exists: false
                    }
                }
            },
            {
                $sort: {
                    created_at: -1
                }
            },
            { $project:  {
                    _id: 0,
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
                }
            },
            {
                $group: {
                    _id: '$date',
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);

        if (postCountByDay.length === 0) {
            return;
        }

        GamificationGrid.remove({
            key: this.key,
            user_id
        });

        const batch = GamificationGrid.rawCollection().initializeUnorderedBulkOp();
        postCountByDay.map(postCount => ({
            date: postCount.date,
            user_id,
            key: this.key,
            count: postCount.count
        })).forEach((gridDoc) => {
            batch.insert(gridDoc);
        });

        const execute = Meteor.wrapAsync(batch.execute, batch);

        execute();
    }
}

import moment = require("moment/moment");
Meteor.startup(() => {
    const p = new PostGridProvider() as any;

    p.createFromScratch('LX5h2Jcs3Ff6Ax4tT')
});