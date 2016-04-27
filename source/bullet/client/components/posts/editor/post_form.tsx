import * as React from 'react';
import {Component, PropTypes} from 'react';

import {ValidationMessages, IValidationErrors} from '../../forms/validation_messages';
import {ValidationMessage} from '../../forms/validation_message';
import {ValidatedInput} from '../../forms/validated_input';
import {isRequired, minLength, emptyOrMinLength} from '../../forms/validators';
import {Form} from "../../forms/form";

export class PostForm extends Form {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    render() {
        const {onSubmit, fields} = this.props;

        return (
            <form onSubmit={onSubmit} noValidate="true">
                <div>
                    <label htmlFor="title">Title</label>
                    <ValidatedInput
                        type="text"
                        value={fields['title']}
                        validators={[emptyOrMinLength(3)]}
                        name="title"
                        {...this.fieldMethods('title')}/>

                    <ValidationMessages errors={this.getErrorsFor('title')}>
                        <ValidationMessage error="emptyOrMinLength">This title is too short!</ValidationMessage>
                    </ValidationMessages>
                </div>


                <div>
                    <label htmlFor="body">Body</label>
                    <ValidatedInput
                        type="textarea"
                        value={fields['body']}
                        validators={[isRequired, minLength(140)]}
                        name="body"
                        {...this.fieldMethods('body')}/>
                    <ValidationMessages errors={this.getErrorsFor('body')}>
                        <ValidationMessage error="required">The body is required</ValidationMessage>
                        <ValidationMessage error="minLength">The body has to be at least 140 characters long</ValidationMessage>
                    </ValidationMessages>
                </div>



                <button type="submit">Submit</button>
            </form>
        );
    }


}