import * as React from 'react';
import {Component, PropTypes} from 'react';

export interface IPostFormProps {
    onChange: any;
    onSubmit: any;
    title: string;
    body: string;
}

export class PostForm extends Component<IPostFormProps, {}> {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    render() {
        const {onChange, onSubmit, title, body} = this.props;

        return (
            <form onSubmit={onSubmit}>
                <input type="text" value={title} name="title" onChange={onChange('title')} />
                <textarea name="body" value={body} onChange={onChange('body')}></textarea>
                <button type="submit">Submit</button>
            </form>
        );
    }


}