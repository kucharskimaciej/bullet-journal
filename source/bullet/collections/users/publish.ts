Meteor.publish('users.me', function() {
    if (!this.userId) {
        return this.ready();
    }

    return Meteor.users.find(this.userId, {
        fields: {
            'services.github.email': 1,
            'services.facebook.email': 1,
            'services.facebook.first_name': 1,
            'profile': 1,
            '_id': 1
        }
    });
});