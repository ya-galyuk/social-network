export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) =>
    value ? undefined : 'Field is required'
export const maxLength = (max: number): FieldValidatorType => (value) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength15 = maxLength(15)
export const minLength = (min: number): FieldValidatorType => (value) =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
