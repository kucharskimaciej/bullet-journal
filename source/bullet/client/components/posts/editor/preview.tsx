import {Post} from '../post';

const styles = require('./preview.styl');

export class PostPreview extends Post {
    constructor(props) {
        super(props);
    }

    get data() {
        return { body: {
            __html: this.state.body
        }, title: this.props.title, created_at: Date.now() }
    }

    rootClass() {
        const previous = super.rootClass();

        return `${previous} ${styles.root}`;
    }
}