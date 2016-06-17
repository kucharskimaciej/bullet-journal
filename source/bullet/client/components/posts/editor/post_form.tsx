import * as React from 'react';
import {Component, PropTypes} from 'react';

import {ValidationMessages, IValidationErrors} from '../../forms/validation_messages';
import {ValidationMessage} from '../../forms/validation_message';
import {ValidatedInput} from '../../forms/validated_input';
import {isRequired, minLength, maxLength, emptyOrMinLength} from '../../forms/validators';
import {Form} from "../../forms/form";

const styles = require('./post_form.styl');

export class PostForm extends Form {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    render() {
        const {fields} = this.props;

        return (
            <form onSubmit={this.onSubmit} noValidate="true">
                <div>
                    <label className={styles.label} htmlFor="body">Body</label>
                    <ValidatedInput
                        className={styles.control}
                        type="textarea" minRows={3} maxRows={6}
                        value={fields['body']}
                        validators={[isRequired, minLength(32), maxLength(255)]}
                        name="body"
                        {...this.fieldMethods('body')}/>

                    {(this.state.touched || fields['body'].touched) &&
                    <ValidationMessages className={styles.validationMessages} errors={this.getErrorsFor('body')}>
                        <ValidationMessage className={styles.validationMessage}
                                           error="required">The body is required</ValidationMessage>
                        <ValidationMessage className={styles.validationMessage}
                                           error="minLength">The body is too short</ValidationMessage>
                        <ValidationMessage className={styles.validationMessage}
                                           error="maxLength">Much too say, eh? Only 140 chars for you!</ValidationMessage>
                    </ValidationMessages>}
                </div>


                <span className={styles.formActions}>
                    <button className={styles.submitButton} type="submit">
                        <span>Submit</span>
                    </button>
                </span>
            </form>
        );
    }


}