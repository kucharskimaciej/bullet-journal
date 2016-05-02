import * as React from 'react';
import {Component, PropTypes, SyntheticEvent} from 'react';

import * as _ from 'underscore';

import {IValidationErrors} from "./validation_messages";
import {ValidatedInput} from "./validated_input";

export interface IFormProps {
    onInvalid?(form:Form, errors:IValidationErrors): any;
    onValid?(form:Form): any;
    onChange?(values: any): any;
    onSubmit?(form: Form): any;
    fields: {
        [fieldName: string]: any;
    };
}

interface IFormState {
    fields: {
        [fieldName: string]: {
            touched: boolean;
            dirty: boolean;
            valid?: boolean;
            errors?: IValidationErrors;
        }
    };
    touched: boolean;
    dirty: boolean;
    valid: boolean;
}

export class Form extends Component<IFormProps, IFormState> {

    get initialState() {
        return {
            touched: false,
            dirty: false,
            valid: true,
            fields: {}
        } as IFormState;
    }

    private registeredFields = {};

    componentDidMount() {
        this.update({
            fields: this.registeredFields,
            valid: this.checkFormValidity(this.registeredFields)
        });
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
    };

    get isValid() {
        return this.state.valid;
    }

    private update(diff, cb?: () => any) {
        // shallow props are merged
        // fields are merged (new object is returned)
        // state.fields[field].errors is replaced by new value
        const newFields = _.extend({}, this.state.fields, diff.fields);
        const newState = _.extend({}, this.state, diff);

        newState.fields = newFields;

        this.setState(newState, cb);
    }

    protected fieldMethods(fieldName: string) {
        return {
            registerField: (inputComponent:ValidatedInput, initialState) => {
                this.registeredFields[fieldName] = initialState;
            },
            onChange: (e:SyntheticEvent, newValue, inputComponent) => {
                const [valid, errors] = inputComponent.validate(newValue);

                this.update({
                    touched: true,
                    dirty: true,
                    valid: this.checkUpdatedFormValidity(fieldName, valid),
                    fields: {
                        [fieldName]: {
                            touched: true,
                            dirty: true,
                            valid,
                            errors
                        }
                    }
                });

                if (this.props.onChange) {
                    this.props.onChange({ [fieldName]: newValue });
                }
            }
        };
    }

    protected onSubmit = (event:SyntheticEvent) => {
        event.preventDefault();
        this.update({
            touched: true,
            dirty: true
        }, () => {
            if (this.props.onSubmit) {
                this.props.onSubmit(this);
            }
        });
    };

    protected checkFormValidity(fields = {}) {
        return Object.keys(fields)
            .map((name) => {
                return fields[name].valid;
            })
            .every(v => v);
    }

    protected getErrorsFor(fieldName) {
        if (fieldName in this.state.fields) {
            return this.state.fields[fieldName].errors;
        }
    }

    private checkUpdatedFormValidity(fieldName: string, valid: boolean) {
        return Object.keys(this.state.fields)
            .map((name) => {
                if (name === fieldName) {
                    return valid;
                }

                return this.state.fields[name].valid;
            })
            .every(v => v);
    }

}