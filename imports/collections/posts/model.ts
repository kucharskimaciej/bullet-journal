import {Mongo} from 'meteor/mongo';

export interface IAggregatedPost {
    date: string;
    count: number;
}

export interface IPost {
    body: string;
    created_at: Date;
    author: string;
    _id: string;
}

export interface IServerPost extends IPost {
    removed?: boolean;
}

export class PostsCollection extends Mongo.Collection<IPost> {
    constructor(name) {
        super(name);
    }
    
    getPostCountByDate(user_id, ...agregationPipes: any[]): IAggregatedPost[] {
        return (this as any).aggregate([
            {
                $match: {
                    author: user_id,
                    removed: {
                        $exists: false
                    }
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
            },
            ...agregationPipes
        ]);
    }
}