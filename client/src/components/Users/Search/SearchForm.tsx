import React, {FC} from 'react';
import {Formik, FormikHelpers} from 'formik';
import {Form, Input, Select, SubmitButton} from 'formik-antd'
import {TFilter} from "../../../redux/reducer/users-reducer";
import {useSelector} from "react-redux";
import {getFilter} from "../../../redux/selectors/users-selectors";
import {SearchOutlined} from '@ant-design/icons';

const {Option} = Select;

const SearchForm: FC<PropsType> = React.memo((props) => {
    const {onFilterChanged} = props

    const filter = useSelector(getFilter)

    const onSubmit = (values: TFilter, {setSubmitting}: FormikHelpers<TFilter>) => {
        onFilterChanged(values)
        setSubmitting(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{query: filter.query, followed: filter.followed}}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form layout="inline">
                    <Form.Item name={"query"} style={{flex: "1 1 auto"}}>
                        <Input type="text" name="query" allowClear/>
                    </Form.Item>
                    <Form.Item name={"followed"} style={{width: 120}}>
                        <Select name="followed" defaultValue="null">
                            <Option value="null">All</Option>
                            <Option value="true">followed</Option>
                            <Option value="false">unfollowed</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"submit"} style={{marginRight: 0}}>
                        <SubmitButton type={"default"} icon={<SearchOutlined/>}
                                      disabled={isSubmitting}>Search</SubmitButton>
                    </Form.Item>
                </Form>
            )}
        </Formik>
    )
})

export default SearchForm;

type PropsType = {
    onFilterChanged: (filter: TFilter) => void
}