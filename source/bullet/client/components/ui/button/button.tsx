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
        'small': styles.buttonSmall
    };

    static defaultProps = {
        btnStyle: 'primary',
        btnSize: '',
        btnType: 'button'
    };

    get buttonClass () {
        const btnCls = `${Button.StyleClasses[this.props.btnStyle]} ${Button.SizeClasses[this.props.btnSize]}`;
        return btnCls + (this.props.className ? ` ${this.props.className}`: '');
    }
    
    render() {
        return (
            <button {...this.props} className={this.buttonClass}>
                <span className={styles.inner}>{ this.props.children }</span>
            </button>
        );
    }
}

const createButtonPreset = (btnStyle?, btnSize?, BaseCls = Button) => {
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