import * as React from 'react';
import {Component, PropTypes, SyntheticEvent} from 'react';

import {Map, fromJS} from 'immutable';
import {IValidationErrors} from "./validation_messages";

export interface IFormProps {
    onInvalid?(form:Form, errors:IValidationErrors): any;
    onValid?(form:Form): any;
    onChange?(values: any): any;
    onSubmit?(form: Form, event: SyntheticEvent): any;
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
}

export class Form extends Component<IFormProps, IFormState> {

    get initialState() {
        return fromJS({
            touched: false,
            dirty: false,
            valid: true,
            fields: {}
        }).toJS();
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
        console.log('got initial state', this.state);
    };

    private update(newState) {
        const prevState = fromJS(this.state);
        console.log('update', this.state, newState.toJS(), prevState.mergeDeep(newState).toJS());
        this.setState(prevState.mergeDeep(newState).toJS());
    }


    protected fieldMethods(fieldName: string) {
        return {
            onChange: (e:SyntheticEvent) => {
                const field = e.target as HTMLInputElement;
                const newState = fromJS({
                    touched: true,
                    dirty: true,
                    fields: {
                        [fieldName]: {
                            touched: true,
                            dirty: true
                        }
                    }
                });

                this.update(newState);
                if (this.props.onChange) {
                    this.props.onChange({ [fieldName]: field.value });
                }
            },
            onBlur: (e:SyntheticEvent) => {
                const newState = fromJS({
                    touched: true,
                    fields: {
                        [fieldName]: {
                            touched: true
                        }
                    }
                });

                this.update(newState);
            },
            onValidate: (valid: boolean, errors?: IValidationErrors) => {
                const newState = fromJS({
                    valid,
                    fields: {
                        [fieldName]: {
                            valid, errors
                        }
                    }
                });

                this.update(newState);

                if(!valid && this.props.onInvalid) {
                    this.props.onInvalid(this, errors);
                }

                if(valid && this.props.onValid) {
                    this.props.onValid(this);
                }
            }
        };
    }

}