import {Posts} from '../../collections/posts';

Meteor.startup(() => {
    if(Posts.find().count() === 0) {
        console.log('empty posts')
    } else {
        console.log('ye')
    }
});
