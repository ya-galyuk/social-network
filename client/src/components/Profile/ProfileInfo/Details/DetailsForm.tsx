import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFullName, getStatus} from "../../../../redux/selectors/profile-selectors";
import {Col, Divider, Row} from "antd";
import {updateProfileDetails} from "../../../../redux/reducer/profile-reducer";
import {Form, Input, SubmitButton} from "formik-antd";
import {Formik, FormikHelpers} from "formik";
import {AvatarContainer} from "../Avatar/AvatarContainer";
import cls from './Details.module.css'

export const DetailsForm: FC<PropsType> = (props) => {
    const {inputRef, editMode, setEditMode} = props

    const fullName = useSelector(getFullName)
    const status = useSelector(getStatus)

    const initialValues = {
        fullName: fullName || '',
        status: status || '',
    }

    const dispatch = useDispatch()

    const onSubmit = (formData: IValues, {setSubmitting}: FormikHelpers<IValues>) => {
        if (JSON.stringify(initialValues) !== JSON.stringify(formData)) {
            dispatch(updateProfileDetails({...formData}))
        }
        setSubmitting(false)
        setEditMode(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Divider orientation="right" className={cls.details__hr}>
                        {editMode &&
                        <Form.Item name={"submit"}>
                            <SubmitButton type={"text"} disabled={isSubmitting}
                                          className={cls.details__btn}>save</SubmitButton>
                        </Form.Item>}
                    </Divider>
                    <Row>
                        <Col span={6}>
                            <Form.Item name={"avatar"}>
                                <AvatarContainer editMode={editMode}/>
                            </Form.Item>
                        </Col>
                        <Col span={18}>
                            <Form.Item name="fullName" className={cls.fullName}>
                                <Input name="fullName" ref={inputRef} placeholder={"Full name"}
                                       className={cls.fullName__input}/>
                            </Form.Item>
                            <Form.Item name="status">
                                <Input.TextArea name="status" placeholder={"Status"} autoSize allowClear/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}

type PropsType = {
    editMode: boolean
    inputRef: React.MutableRefObject<any>
    setEditMode: (editMode: boolean) => void
}

interface IValues {
    fullName: string,
    status: string
}