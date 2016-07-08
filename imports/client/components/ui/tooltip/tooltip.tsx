import * as React from 'react';
import {Component, PropTypes} from 'react';

export interface ITooltipProps extends IComponentProps {
    text: string;
    trigger?: string;
}

const styles = require('./tooltip.styl');

function getRootClass(visible, direction = "top") {
    let cls = styles.root;

    if (visible) {
        cls += ` ${styles.show}`;
    }

    return cls + ` ${styles[direction]}`;
}

export class Tooltip extends Component<ITooltipProps, { visible: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    show = () => {
        this.setState({ visible: true });
    };

    hide = () => {
        this.setState({ visible: false });
    };

    render() {
        const {children, text, trigger} = this.props;
        const {visible} = this.state;

        let actionStart, actionEnd;
        switch (trigger) {
            default:
                actionStart = 'onMouseEnter';
                actionEnd = 'onMouseLeave';
        }

        const action = {
            [actionStart]: this.show,
            [actionEnd]: this.hide
        };

        return (
            <span className={getRootClass(visible)} {...action}>
                {children}
                <aside className={styles.tooltip}>{text}</aside>
            </span>
        );
    }
}