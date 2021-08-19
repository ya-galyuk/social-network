import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {getFullName, getStatus} from "../../../../redux/selectors/profile-selectors";
import {Button, Col, Divider, Row, Typography} from "antd";
import {AvatarContainer} from "../Avatar/AvatarContainer";
import cls from "./Details.module.css";

const {Paragraph} = Typography;

export const Details: FC<PropsType> = (props) => {
    const {inputRef, editMode, setEditMode} = props

    const fullName = useSelector(getFullName)
    const status = useSelector(getStatus)

    const onClickEdit = async () => {
        await setEditMode(true)
        inputRef.current!?.focus({cursor: 'end'})
    }

    return (
        <div className={cls.details}>
            <Divider orientation="right" className={cls.details__hr}>
                {!editMode
                && <Button type={"text"} onClick={onClickEdit} className={cls.details__btn}>edit</Button>}
            </Divider>
            <Row>
                <Col span={6}>
                    <AvatarContainer editMode={editMode}/>
                </Col>
                <Col span={18}>
                    <Paragraph className={cls.fullName__paragraph}>{fullName}</Paragraph>
                    <Paragraph className={cls.status__paragraph}>{status}</Paragraph>
                </Col>
            </Row>
        </div>
    );
}

type PropsType = {
    editMode: boolean
    inputRef: React.MutableRefObject<any>
    setEditMode: (editMode: boolean) => void
}
