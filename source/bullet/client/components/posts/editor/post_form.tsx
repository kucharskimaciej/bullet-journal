import * as React from 'react';
import {Component, PropTypes} from 'react';

import {ValidationMessages, IValidationErrors} from '../../forms/validation_messages';
import {ValidationMessage} from '../../forms/validation_message';

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

        const errors = {
            "type": true,
            "required": undefined
        } as IValidationErrors;

        return (
            <form onSubmit={onSubmit}>
                <input type="text" value={title} name="title" onChange={onChange('title')} />
                <textarea name="body" value={body} onChange={onChange('body')}></textarea>
                <button type="submit">Submit</button>
                <ValidationMessages errors={errors} multi={true}>
                    <ValidationMessage error="type">Type error</ValidationMessage>
                    <ValidationMessage error="required">Field is not optional</ValidationMessage>
                </ValidationMessages>
            </form>
        );
    }


}