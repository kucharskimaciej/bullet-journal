import getSlug = OngoworksSpeakingurl.getSlug;

@Namespace("Collections")
class PostsCollection extends Collections.BaseCollection {
    constructor(name:string = "posts") {
        super(name);
    }
}

Namespace("Collections", function() {
    const Posts = new this.PostsCollection();

    Meteor.methods({
        createPost({ title, body }) {
            if(!this.userId) {
                throw new Meteor.Error("Unauthenticated");
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
        updatePost({ _id, title, body }) {
            if (!this.userId) {
                throw new Meteor.Error("Unauthenticated");
            }

            const post = Posts.findOne({ _id });

            if(!post) {
                throw new Meteor.Error("Post not found");
            }

            if(post.author !== this.userId) {
                throw new Meteor.Error("Unauthorized");
            }

            if(post.title !== title) {
                post.title = title;
                post.slug = getSlug(title);
            }

        }
    });

    Meteor.publish("posts", () => {
        return Posts.find({
            author: Meteor.userId(),
            sort: {
                created_at: -1
            }
        });
    });
});

