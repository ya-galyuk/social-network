import React, {FC} from 'react';
import {Divider} from "antd";
import {BtnEdit} from "../../common/Button/Btn";

const Title: FC<PropsType> = (props) => {
    const {title = null, isOwner, editMode, editable = true, setEditMode} = props

    const onClickBtnEdit = () => setEditMode ? setEditMode(!editMode) : undefined

    return (
        <>
            {editable && <Divider orientation="right">{isOwner && <BtnEdit onClick={onClickBtnEdit}/>}</Divider>}
            {title && <h1 style={!editable ? {marginTop: 40} : undefined}>{title}</h1>}
        </>
    );
};

export default Title;

type PropsType = {
    title: string | null
    editMode?: boolean
    isOwner?: boolean
    editable?: boolean
    setEditMode?: (editMode: boolean) => void
}