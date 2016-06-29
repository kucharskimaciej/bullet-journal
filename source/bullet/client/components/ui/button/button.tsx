import * as React from 'react'; 
import { Component } from 'react';

interface IButtonProps extends IComponentProps {
    btnStyle?: string;
    btnSize?: string;
    btnType?: string;
}
const styles = require('./button.styl');


export default class Button extends Component<IButtonProps,{}> {
    private static StyleClasses = {
        'primary': styles.buttonPrimary,
        'secondary': styles.buttonSecondary,
        'success': styles.buttonSuccess,
        'warning': styles.buttonWarning
    };

    private static SizeClasses = {
        'small': styles.buttonSmall,
        'normal': ''
    };

    static defaultProps = {
        btnStyle: 'primary',
        btnSize: 'normal',
        btnType: 'button'
    };

    get buttonClass () {
        return `${Button.StyleClasses[this.props.btnStyle]} ${Button.SizeClasses[this.props.btnSize]} ${this.props.className || ''}`;
    }
    
    render() {
        return (
            <button {...this.props} className={this.buttonClass}>
                <span className={styles.inner}>{ this.props.children }</span>
            </button>
        );
    }
}

const createButtonPreset = (btnStyle, btnSize = 'normal', BaseCls = Button) => {
    return class extends BaseCls {
        static defaultProps = Object.assign({}, BaseCls.defaultProps, {
            btnStyle, btnSize
        });
    };
};


export const PrimaryButton = createButtonPreset('primary');
export const SecondaryButton = createButtonPreset('secondary');
export const SuccessButton = createButtonPreset('success');
export const WarningButton = createButtonPreset('warning');