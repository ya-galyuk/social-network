import React from 'react';
import cls from './FormControls.module.css'

const FormControl = (props) => {
    const {input, meta: {touched, error}, ...restProps} = props
    const hasError = touched && error

    return (
        <div className={cls.formControl + " " + (hasError ? cls.error : undefined)}>
            {restProps.children}
            {hasError && <span className={cls.error}>{error}</span>}
        </div>
    );
};

export const Input = (props) => {
    const {input, ...restProps} = props
    return (<FormControl {...props}><input {...input} {...restProps}/></FormControl>);
};

export const Textarea = (props) => {
    const {input, ...restProps} = props
    return (<FormControl {...props}><textarea {...input} {...restProps}/></FormControl>)
};

export default Input;