import getSlug = require('speakingurl');

export interface IPost {
    title: string,
    body: string,
    created_at: number,
    slug: string,
    author: string
}

export const Posts = new Mongo.Collection<IPost>("posts");

Meteor.publish("posts", () => {
    return Posts.find({
        author: Meteor.userId(),
        sort: {
            created_at: -1
        }
    });
});

Meteor.methods({
    createPost({ title, body }: IPost) {
        if (!this.userId) {
            throw new Meteor.Error("Unauthenticated");
        }

        check(title, String);
        check(body, String);

        const document: IPost = {
            title, body,
            author: this.userId,
            created_at: Date.now(),
            slug: getSlug(title)
        };

        return Posts.insert(document);
    },
    updatePost({ _id, title, body }: IPost) {
        if (!this.userId) {
            throw new Meteor.Error("Unauthenticated");
        }

        const post = Posts.findOne({_id});

        if (!post) {
            throw new Meteor.Error("Post not found");
        }

        if (post.author !== this.userId) {
            throw new Meteor.Error("Unauthorized");
        }

        if (post.title !== title) {
            post.title = title;
            post.slug = getSlug(title);
        }

        if (post.body !== body) {
            post.body = body;
        }
    }
});




