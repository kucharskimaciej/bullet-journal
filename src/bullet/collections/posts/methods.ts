import {Posts, IPost} from './posts';
import getSlug = require('speakingurl');
import {
    Methods,
    registerMethods,
    findById,
    authenticate
} from '../../lib/method_utils';

@registerMethods({
    collection: Posts,
    methods: ['createPost', 'updatePost', 'removePost']
})
class PostMethods extends Methods<Mongo.Collection<IPost>> {

    @authenticate
    createPost({ title, body }: IPost) {
        check(title, String);
        check(body, String);

        const document:any = {
            title, body,
            author: this.userId,
            created_at: Date.now(),
            slug: getSlug(title)
        };

        return Posts.insert(document);
    }

    @authenticate
    @findById
    updatePost(post:IPost, { _id, title, body }: IPost) {
        let $set:{ title?: string, body?: string, slug?: string } = {};

        if (post.author !== this.userId) {
            throw new Meteor.Error(401, 'Unauthorized');
        }

        check(title, String);
        check(body, String);

        if (post.title !== title) {
            $set.title = title;
            $set.slug = getSlug(title);
        }

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