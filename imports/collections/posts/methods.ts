import {Meteor} from 'meteor/meteor';
import {Posts, IServerPost, IPost} from './posts';
import {
    Methods,
    registerMethods,
    findById,
    authenticate
} from '../../lib/method_utils';
import {PostsCollection} from "./model";

@registerMethods({
    collection: Posts,
    methods: ['createPost', 'updatePost', 'removePost', 'undoRemovePost', 'deletePost']
})
class PostMethods extends Methods<PostsCollection> {

    @authenticate
    createPost({ body }: IPost) {
        check(body, String);

        const document:any = {
            body,
            author: this.userId
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

        return Posts.update(_id, {
            $set: {
                removed: true
            }
        });
    }
    
    @authenticate
    @findById
    undoRemovePost(post:IPost, { _id }: IPost) {
        if (post.author !== this.userId) {
            throw new Meteor.Error(401, 'Unauthorized');
        }

        return Posts.update(_id, {
            $unset: {
                removed: 1
            }
        });
    }

    @authenticate
    @findById
    deletePost(post: IServerPost, { _id }: IServerPost) {
        if (post.author !== this.userId) {
            throw new Meteor.Error(401, 'Unauthorized');
        }

        if (!post.removed) {
            return Meteor.call('removePost', post);
        }

        return Posts.remove({ _id });
    }
}