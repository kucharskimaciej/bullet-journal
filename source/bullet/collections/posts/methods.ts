import {Posts, IPost} from './posts';
import {
    Methods,
    registerMethods,
    findById,
    authenticate
} from '../../lib/method_utils';
import getSlug = require("speakingurl");

@registerMethods({
    collection: Posts,
    methods: ['createPost', 'updatePost', 'removePost']
})
class PostMethods extends Methods<Mongo.Collection<IPost>> {

    @authenticate
    createPost({ body }: IPost) {
        check(body, String);

        const document:any = {
            body,
            author: this.userId,
            created_at: Date.now()
        };

        return Posts.insert(document);
    }

    @authenticate
    @findById
    updatePost(post:IPost, { _id, body }: IPost) {
        let $set:{ body?: string, slug?: string } = {};

        if (post.author !== this.userId) {
            throw new Meteor.Error(401, 'Unauthorized');
        }

        check(body, String);

        if (post.body !== body) {
            $set.body = body;
        }

        return Posts.update({_id}, {$set}, {multi: false});
    }

    @authenticate
    @findById
    removePost(post:IPost, { _id }: IPost) {
        if (post.author !== this.userId) {
            throw new Meteor.Error(401, 'Unauthorized');
        }

        return Posts.remove({_id});
    }
}