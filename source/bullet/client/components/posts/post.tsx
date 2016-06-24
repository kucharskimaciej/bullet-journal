import * as React from 'react';
import {Component, PropTypes} from 'react';

import {IPost} from '../../../collections/posts/posts';
import {PostDate} from './post_date';
import {showUpdateModal, showRemoveModal} from '../../actions/modals';
import {showPostRemoveNotification} from '../../actions/notifications';
import store from '../../store';

import {marked} from '../../services/markdown';
import * as _ from 'underscore';

const styles = require('./post.styl');

export interface IPostProps {
    body: string;
    created_at?: number;
    author?: string;
    _id?: string;
}

export interface IPostState {
    body: string;
}

export class Post extends Component<IPostProps, IPostState> {
    static propTypes = {
        _id: PropTypes.string,
        body: PropTypes.string.isRequired,
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
        return nextState.body !== this.state.body;
    }

    get data() {
        const {created_at} = this.props;

        return { body: {
            __html: this.state.body
        }, created_at };
    }

    rootClass() {
        return styles.root;
    }

    onEdit = () => {
        store.dispatch(showUpdateModal(this.props as IPost));
    };

    onDelete = () => {
        store.dispatch(showPostRemoveNotification(this.props as IPost));
    };

    render() {
        const {body, created_at} = this.data;

        if (!body.__html) {
            return null;
        }

        return (
            <article className={this.rootClass()}>
                <header className={styles.header}>
                    <span className={styles.date}>
                        <PostDate createdAt={created_at} />
                    </span>
                    <section className={styles.actions}>
                        <a onClick={this.onEdit}>edit</a>
                        <a onClick={this.onDelete}>remove</a>
                    </section>
                </header>
                
                <div className={styles.content} dangerouslySetInnerHTML={body}></div>
            </article>
        );
    }
}