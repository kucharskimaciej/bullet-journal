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
        const {onSubmit, fields} = this.props;

        const isRequired = (value: string) => {
            if (value && !!value.trim()) {
                return;
            }

            return { required: true };
        };

        const minLength = (constraint: number) => {
            return (value: string) => {
                if (value && value.length > 5) {
                    return;
                }

                return { minLength: true };
            };
        };

        return (
            <form onSubmit={onSubmit} noValidate>
                <ValidatedInput
                    type="text"
                    value={fields['title']}
                    name="title"
                    {...this.fieldMethods('title')}/>

                <ValidationMessages errors={this.getErrorsFor('title')}>
                    <ValidationMessage error="required">Field is not optional</ValidationMessage>
                    <ValidationMessage error="minLength">Longer!</ValidationMessage>
                </ValidationMessages>

                <button type="submit">Submit</button>
            </form>
        );
    }


}