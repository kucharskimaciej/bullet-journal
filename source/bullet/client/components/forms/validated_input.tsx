import * as React from 'react';
import {Component, PropTypes, SyntheticEvent} from 'react';

import Textarea from 'react-textarea-autosize';

import * as _ from 'underscore';

import {IValidationErrors} from './validation_messages';

export interface IValidator {
    (value: any): IValidationErrors|any;
}

export interface IValidatedInputProps extends IComponentProps {
    type: string;
    registerField: (inputComponent: ValidatedInput, fieldState) => any;
    validators?: IValidator[];
    onChange?: (e: SyntheticEvent, value: any, inputComponent: ValidatedInput) => any;
    onFocus?: (e:SyntheticEvent) => any;

    value?: any;
    name?: string;
    id?: string;
    readonly?: string;
    className?: string;

    minRows: number;
    maxRows: number;
}

export const inputTypes = ['text', 'textarea'];
export const PASSTHROUGH_FIELDS = ['className', 'onFocus', 'name', 'id', 'readonly', 'disabled', 'value', 'minRows', 'maxRows'];

export class ValidatedInput extends Component<IValidatedInputProps, {}> {
    static propTypes = {
        type: PropTypes.oneOf(inputTypes).isRequired,
        validators: PropTypes.arrayOf(PropTypes.func)
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let fieldState = {
            dirty: false,
            touched: false,
            valid: true,
            errors: null
        };

        let [valid, errors] = this.validate(this.props.value);
        fieldState.valid = valid;
        fieldState.errors = errors;

        this.props.registerField(this, fieldState);
    }

    shouldComponentUpdate(nextProps: IValidatedInputProps) {
        const passThrough = _.pick(this.props, ...PASSTHROUGH_FIELDS, 'type');
        return Object.keys(passThrough).some((key: string) => {
            return nextProps[key] !== this.props[key];
        });
    }

    private validate(value): [boolean, IValidationErrors] {
        const {validators} = this.props;

        if (!validators || validators.length === 0) {
            return [true, null];
        }

        const errors = validators.reduce(($, validator: IValidator) => {
            return Object.assign($, validator(value));
        }, {});

        const valid = !Object.keys(errors).length;

        return [valid, errors];
    }

    onChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;

        if (this.props.onChange) {
            this.props.onChange(e, target.value, this);
        }
    };

    render() {
        const passThrough =  _.pick(this.props, ...PASSTHROUGH_FIELDS);

        switch (this.props.type) {
            case "text":
                return <input type="text" {...passThrough} onChange={this.onChange} />;
            case "textarea":
                return <Textarea {...passThrough} onChange={this.onChange}/>;
        }
    }

}