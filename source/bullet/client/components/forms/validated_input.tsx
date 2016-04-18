import * as React from 'react';
import {Component, PropTypes,SyntheticEvent} from 'react';

import * as _ from 'underscore';

import {ValidationMessage} from './validation_message';
import {ValidationMessages, IValidationErrors} from './validation_messages';

export interface IValidator {
    (value: any): IValidationErrors|any;
}

export interface IValidatedInputProps {
    type: string;
    validators?: IValidator[],
    onValidate?: (valid: boolean, errors: IValidationErrors) => any;
    onChange?: (e: SyntheticEvent, value: any) => any;
    onFocus?: (e:SyntheticEvent) => any;

    value?: any;
    name?: string;
    id?: string;
    readonly?: string;
    disabled?: string;
    className?: string;
}

export class ValidatedInput extends Component<IValidatedInputProps, {}> {
    static propTypes = {
        type: PropTypes.oneOf(['text', 'textarea']).isRequired,
        validators: PropTypes.arrayOf(PropTypes.func)
    };

    private validate(value) {
        const {validators, onValidate} = this.props;

        if (!validators || validators.length === 0) {
            return true;
        }

        if (!onValidate) {
            return true;
        }

        const errors = validators.reduce(($, validator: IValidator) => {
            return Object.assign($, validator(value));
        }, {});

        const valid = !Object.keys(errors).length;

        onValidate(valid, errors);

        return valid;
    }

    onChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        this.validate(target.value);

        if(this.props.onChange) {
            this.props.onChange(e, target.value);
        }
    };

    render() {
        const passThrough = _.pick(this.props, 'onFocus', 'name', 'id', 'readonly', 'disabled', 'value');

        switch (this.props.type) {
            case "text":
                return <input type="text" {...passThrough} onChange={this.onChange} />;
            case "textarea":
                return <textarea {...passThrough} onChange={this.onChange}/>;
        }
    }

}