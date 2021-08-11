import React, {FC} from 'react';
import {Formik, Form, Field} from 'formik';
import {TFilter} from "../../../redux/reducer/users-reducer";
import {useSelector} from "react-redux";
import {getFilter} from "../../../redux/selectors/users-selectors";

const SearchForm: FC<PropsType> = React.memo((props) => {
    const {onFilterChanged} = props

    const filter = useSelector(getFilter)

    const validateForm = (values: TFilter) => {
        const errors = {};
        return errors;
    }

    const onSubmit = (values: TFilter, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        onFilterChanged(values)
        setSubmitting(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{query: filter.query, followed: filter.followed}}
            validate={validateForm}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="query"/>
                    <Field name="followed" as="select">
                        <option value="null">All</option>
                        <option value="true">followed</option>
                        <option value="false">unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    )
})

export default SearchForm;

type PropsType = {
    onFilterChanged: (filter: TFilter) => void
}