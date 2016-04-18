import * as React from 'react';
import {Component, PropTypes} from 'react';

import * as _ from 'underscore';

export interface IValidationErrors {
    [errorType: string]: boolean;
}

export interface IValidationMessages {
    errors?: IValidationErrors,
    multi?: boolean
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
        return _.find(this.children, (child:ValidationMessage) => this.props.errors[child.props.error]);
    }

    private get matchingChildren() {
        return _.filter(this.children, (child:ValidationMessage) => this.props.errors[child.props.error]);
    }

    render() {
        console.log('this.props.children', this.props.children);
        if(!this.props.multi) {
            return <span>{this.matchingChild}</span>;
        } else {
            return <span>{this.matchingChildren}</span>;
        }
    }
}

export interface IValidationMessage {
    error: string;
}

export class ValidationMessage extends Component<IValidationMessage, {}> {
    static propTypes = {
        error: PropTypes.string.isRequired
    };


    render() {
        return <span>{this.props.children}</span>;
    }

}