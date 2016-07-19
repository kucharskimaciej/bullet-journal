import {Posts, IServerPost} from "../../collections/posts/posts";
import {createPost, removePost} from './subjects';
import {notify} from './gamification';

Posts.after.insert((userId, post) => 
    notify(createPost(post.author, post))
);

Posts.after.remove((userId, post: IServerPost) => {
    notify(removePost(post));
});