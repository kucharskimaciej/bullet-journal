import getSlug = OngoworksSpeakingurl.getSlug;
import IPost = Collections.IPost;

@Namespace('Collections')
class PostsCollection extends Collections.BaseCollection {
    constructor(name: string = 'posts') {
        super(name);
    }
}

Namespace('Collections', function() {
    const Posts = new this.PostsCollection();

    Meteor.methods({
        createPost({ title, body }: IPost) {
            if (!this.userId) {
                throw new Meteor.Error(403, 'Unauthenticated');
            }

            check(title, String);
            check(body, String);

            const document: any = {
                title, body,
                author: this.userId,
                created_at: Date.now(),
                slug: getSlug(title)
            };

            return Posts.insert(document);
        },
        updatePost({ _id, title, body }: IPost) {
            let $set: { title?: string, body?: string, slug?: string };
            if (!this.userId) {
                throw new Meteor.Error(403, 'Unauthenticated');
            }

            const post = Posts.findOne({ _id });

            if (!post) {
                throw new Meteor.Error(404, 'Post not found');
            }

            if (post.author !== this.userId) {
                throw new Meteor.Error(401, 'Unauthorized');
            }

            if (post.title !== title) {
                $set.title = title;
                $set.slug = getSlug(title);
            }

            if (post.body !== body) {
                $set.body = body;
            }

            return Posts.update({ _id }, { $set }, { multi: false });
        },
        removePost({ _id }: IPost) {
            if (!this.userId) {
                throw new Meteor.Error(403, 'Unauthenticated');
            }

            const post = Posts.findOne({ _id });

            if (!post) {
                throw new Meteor.Error(404, 'Post not found');
            }

            if (post.author !== this.userId) {
                throw new Meteor.Error(401, 'Unauthorized');
            }

            return Posts.remove({ _id });
        }
    });

    Meteor.publish('posts', () => {
        return Posts.find({
            author: Meteor.userId(),
            sort: {
                created_at: -1
            }
        });
    });
});

