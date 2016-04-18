import * as React from 'react';
import {Component, PropTypes} from 'react';

import * as _ from 'underscore';

import {ValidationMessage} from "./validation_message";

export interface IValidationErrors {
    [errorType: string]: boolean;
}

export interface IValidationMessages {
    errors?: IValidationErrors;
    multi?: boolean;
}

export class ValidationMessages extends Component<IValidationMessages, any> {
    static propTypes = {
        errors: PropTypes.object,
        multi: PropTypes.bool
    };

    private get children() {
        return this.props.children as ValidationMessage[];
    }

    private get matchingChild() {
        return _.find(this.children,
            (child:ValidationMessage) => this.props.errors && this.props.errors[child.props.error]);
    }

    private get matchingChildren() {
        return _.filter(this.children,
            (child:ValidationMessage) => this.props.errors && this.props.errors[child.props.error]);
    }

    render() {
        if (!this.props.multi) {
            return <span>{this.matchingChild}</span>;
        } else {
            return <span>{this.matchingChildren}</span>;
        }
    }
}

