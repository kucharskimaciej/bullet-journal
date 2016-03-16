export function withFacebook() {
    Meteor.loginWithFacebook({}, (err: Error) => {
        if (err) {
            console.error(err);
        }
    });
}

export function logout() {
    Meteor.logout();
}