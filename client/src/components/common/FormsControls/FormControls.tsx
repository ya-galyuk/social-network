import React, {FC} from 'react';
import cls from './FormControls.module.css'
import {Field, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators";

const FormControl: FC<WrappedFieldProps & { children?: React.ReactNode; }> = (props) => {
    const {meta: {touched, error}, children} = props
    const hasError = touched && error

    return (
        <div className={cls.formControl + " " + (hasError ? cls.error : undefined)}>
            {children}
            {hasError && <span className={cls.error}>{error}</span>}
        </div>
    );
};

export const Input: FC<WrappedFieldProps> = (props) => {
    const {input, ...restProps} = props
    return (<FormControl {...props}><input {...input} {...restProps}/></FormControl>);
};

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const {input, ...restProps} = props
    return (<FormControl {...props}><textarea {...input} {...restProps}/></FormControl>)
};

export function createField<T extends string>(name: T, type: string, component: FC<WrappedFieldProps>, validators: Array<FieldValidatorType>, placeholder: string | undefined, props = {}) {
    return <Field name={name} type={type} component={component} validate={validators}
                  placeholder={placeholder} {...props}/>
}

// export default FormControls;