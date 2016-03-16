/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../lib/meteor.d.ts" />

import getSlug = require('speakingurl');
import {
    Methods,
    registerMethods,
    findById,
    authenticate
} from '../lib/method_utils';

export interface IPost {
    title: string;
    body: string;
    created_at: number;
    slug: string;
    author: string;
}

export const Posts = new Mongo.Collection<IPost>('posts');

Meteor.publish('posts', () => {
    return Posts.find({
        author: Meteor.userId(),
        sort: {
            created_at: -1
        }
    });
});

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




