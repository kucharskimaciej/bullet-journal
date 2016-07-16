import {Posts} from "../../collections/posts/posts";
import {createPost} from './subjects';
import {notify} from './gamification';

Posts.after.insert((userId, post) => 
    notify(createPost(post.author, post))
); 