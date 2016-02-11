import IPost = Collections.IPost;

@utils.registerMethods({
    collection: Collections.Posts,
    methods: ['createPost', 'updatePost', 'removePost']
})
class PostMethods extends utils.Methods<Mongo.Collection<IPost>> {

    @utils.authenticate
    createPost({ title, body }: IPost) {
        check(title, String);
        check(body, String);

        const document: any = {
            title, body,
            author: this.userId,
            created_at: Date.now(),
            slug: getSlug(title)
        };

        return Collections.Posts.insert(document);
    }

    @utils.authenticate
    @utils.findById
    updatePost(post: IPost, { _id, title, body }: IPost) {
        let $set: { title?: string, body?: string, slug?: string } = {};

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
    }

    @utils.authenticate
    @utils.findById
    removePost(post: IPost, { _id }: IPost) {

        if (!post) {
            throw new Meteor.Error(404, 'Post not found');
        }

        if (post.author !== this.userId) {
            throw new Meteor.Error(401, 'Unauthorized');
        }

        return Collections.Posts.remove({ _id });
    }
}