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
        'secodary': styles.buttonSecondary,
        'success': styles.buttonSuccess,
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
        return `${Button.StyleClasses[this.props.btnStyle]} ${Button.SizeClasses[this.props.btnSize]}`;
    }
    
    render() {
        const {btnType, children} = this.props;
        return (
            <button type={btnType} className={this.buttonClass} {...this.props}>
                <span className={styles.inner}>{ children }</span>
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