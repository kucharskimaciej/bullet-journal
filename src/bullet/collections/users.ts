Meteor.publish("currentUser", function() {
    console.log('subscribing...', this.userId);
    return Meteor.users.find(this.userId, {
        fields: {
            'services.github.email': 1,
            'services.facebook.email': 1,
            'services.facebook.first_name': 1,
            'emails': 1,
            'profile': 1
        }
    });
});