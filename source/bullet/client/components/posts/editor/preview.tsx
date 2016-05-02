import {Post} from '../post';

export class PostPreview extends Post {
    get data() {
        return { body: {
            __html: this.state.body
        }, title: this.props.title, created_at: Date.now() }
    }
}