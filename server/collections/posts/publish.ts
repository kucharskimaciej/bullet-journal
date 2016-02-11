Meteor.publish('posts', function() {
    return Collections.Posts.find({
        author: this.userId,
        sort: {
            created_at: -1
        }
    });
});
