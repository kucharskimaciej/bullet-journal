const Login = {
    withFacebook() {
        Meteor.loginWithFacebook({}, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
};
console.log('here', Login);

export default Login;