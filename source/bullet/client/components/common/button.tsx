import * as React from 'react'; 
import { Component } from 'react';

interface IButtonProps {
    btnStyle?: string;
    btnSize?: string;
    btnType?: string;

    [other:string]: any;
}
const styles = require('./button.styl');


export class Button extends Component<IButtonProps,{}> {
    private static StyleClass = {
        'primary': styles.buttonPrimary
    };

    static defaultProps = {
        btnStyle: 'primary',
        btnSize: '',
        btnType: 'button'
    };
    
    render() {
        const {btnStyle, btnType, children} = this.props;
        return (
            <button type={btnType} className={Button.StyleClass[btnStyle]} {...this.props}>
                <span className={styles.inner}>{ children }</span>
            </button>
        );
    }
}