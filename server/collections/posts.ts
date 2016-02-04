import IPost = Collections.IPost;

@Namespace('Collections')
class PostsCollection extends Collections.BaseCollection {
    constructor(name: string = 'posts') {
        super(name);
    }
}
Namespace('Collections', function() {
    Collections.Posts = new this.PostsCollection();

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

            return Collections.Posts.insert(document);
        },
        updatePost({ _id, title, body }: IPost) {
            let $set: { title?: string, body?: string, slug?: string };

            if (!this.userId) {
                throw new Meteor.Error(403, 'Unauthenticated');
            }

            const post = this.Posts.findOne({ _id });

            if (!post) {
                throw new Meteor.Error(404, 'Post not found');
            }

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

            return Collections.Posts.update({ _id }, { $set }, { multi: false });
        },
        removePost({ _id }: IPost) {
            if (!this.userId) {
                throw new Meteor.Error(403, 'Unauthenticated');
            }

            const post = Collections.Posts.findOne({ _id }) as IPost;

            if (!post) {
                throw new Meteor.Error(404, 'Post not found');
            }

            if (post.author !== this.userId) {
                throw new Meteor.Error(401, 'Unauthorized');
            }

            return Collections.Posts.remove({ _id });
        }
    });

    Meteor.publish('posts', function() {
        return Collections.Posts.find({
            author: this.userId(),
            sort: {
                created_at: -1
            }
        });
    });
});

