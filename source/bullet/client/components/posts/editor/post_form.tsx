import * as React from 'react';
import {Component, PropTypes} from 'react';

import {ValidationMessages, IValidationErrors} from '../../forms/validation_messages';
import {ValidationMessage} from '../../forms/validation_message';
import {ValidatedInput} from '../../forms/validated_input';
import {Form} from "../../forms/form";

export class PostForm extends Form {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    render() {
        const {onChange, onSubmit, fields} = this.props;

        const errors = {
            "type": true,
            "required": undefined
        } as IValidationErrors;

        const isRequired = (value: string) => {
            if(value && !!value.trim()) {
                return;
            }

            return { required: true };
        };

        console.log('title', this.state.fields['title']);

        return (
            <form onSubmit={onSubmit} noValidate>
                <ValidatedInput
                    type="text"
                    value={fields['title']}
                    name="title"
                    validators={[isRequired]}
                    {...this.fieldMethods('title')}/>

                <ValidationMessages errors={errors} multi={true}>
                    <ValidationMessage error="type">Type error</ValidationMessage>
                    <ValidationMessage error="required">Field is not optional</ValidationMessage>
                </ValidationMessages>

                <button type="submit">Submit</button>
            </form>
        );
    }


}