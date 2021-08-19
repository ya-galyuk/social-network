import React, {FC} from 'react';
import {Divider} from "antd";
import {BtnEdit} from "../../common/Button/Btn";

const Title: FC<PropsType> = (props) => {
    const {title, isOwner, editMode, editable = true, setEditMode} = props

    const onClickBtnEdit = () => setEditMode ? setEditMode(!editMode) : undefined

    return (
        <>
            {editable && <Divider orientation="right">{isOwner && <BtnEdit onClick={onClickBtnEdit}/>}</Divider>}
            <h1 style={!editable ? {marginTop: 40} : undefined}>{title}</h1>
        </>
    );
};

export default Title;

type PropsType = {
    title: string | undefined
    editMode?: boolean
    isOwner?: boolean
    editable?: boolean
    setEditMode?: (editMode: boolean) => void
}