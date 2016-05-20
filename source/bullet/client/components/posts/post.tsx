import * as React from 'react';
import {Component, PropTypes} from 'react';

import {IPost} from '../../../collections/posts/posts';
import {PostDate} from './post_date';

import {marked} from '../../services/markdown';
import * as _ from 'underscore';

const styles = require('./post.styl');

export interface IPostProps {
    title: string;
    body: string;
    created_at?: number;
    author?: string;
    _id?: string;
    slug?: string;
}

export interface IPostState {
    body: string;
}

export class Post extends Component<IPostProps, IPostState> {
    static propTypes = {
        _id: PropTypes.string,
        body: PropTypes.string.isRequired,
        title: PropTypes.string,
        author: PropTypes.string,
        created_at: PropTypes.number,
        slug: PropTypes.string
    };

    get initialState():IPostState {
        return {
            body: marked(this.props.body || '')
        };
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    renderMarkdown = _.throttle((content) => {
        this.setState({
            body: marked(content)
        });
    }, 250);

    componentWillReceiveProps(nextProps) {
        if (this.props.body !== nextProps.body) {
            this.renderMarkdown(nextProps.body);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.title !== this.props.title || nextState.body !== this.state.body;
    }

    get data() {
        const {title, created_at} = this.props;

        return { body: {
            __html: this.state.body
        }, title, created_at };
    }

    rootClass() {
        return styles.root;
    }

    render() {
        const {body, title, created_at} = this.data;

        if (!title && !body.__html) {
            return null;
        }

        return (
            <article className={this.rootClass()}>
                <header className={styles.header}>
                    <span className={styles.date}>
                        <PostDate createdAt={created_at} />
                    </span>
                    { title ? <h2>{title}</h2> : null }
                </header>
                <div className={styles.content} dangerouslySetInnerHTML={body}></div>
            </article>
        );
    }


}