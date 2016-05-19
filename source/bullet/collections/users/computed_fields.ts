function facebookPictureUrl(userId) {
    return `http://graph.facebook.com/${userId}/picture?type=large`
}

function githubPictureUrl(userId) {
    return `https://avatars1.githubusercontent.com/u/${userId}`;
}

Meteor.users.computedFields.add('profile.picture', function (user) {
    if ('facebook' in user.services) {
        const facebookId = user.services.facebook.id;
        this.set(facebookPictureUrl(facebookId));
        return;
    }

    if ('github' in user.services) {
        const githubId = user.services.github.id;
        this.set(githubPictureUrl(githubId));
        return;
    }
});