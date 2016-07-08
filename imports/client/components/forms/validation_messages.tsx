import * as React from 'react';
import {Component, PropTypes} from 'react';

import * as _ from 'underscore';

import {ValidationMessage} from "./validation_message";

export interface IValidationErrors {
    [errorType: string]: boolean;
}

export interface IValidationMessages extends IComponentProps {
    errors?: IValidationErrors;
    multi?: boolean;
}

export class ValidationMessages extends Component<IValidationMessages, any> {
    static propTypes = {
        errors: PropTypes.object,
        multi: PropTypes.bool
    };

    private get children() {
        if (_.isArray(this.props.children)) {
            return this.props.children as ValidationMessage[];
        }

        return [this.props.children] as ValidationMessage[];
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
        const transfer = _.omit(this.props, 'errors', 'multi');

        if (!this.props.multi) {
            return <span {...transfer}>{this.matchingChild}</span>;
        } else {
            return <span {...transfer}>{this.matchingChildren}</span>;
        }
    }
}

