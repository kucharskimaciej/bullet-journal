Meteor.startup(() => {
    if(Collections.Posts.find().count() === 0) {

    }
});
