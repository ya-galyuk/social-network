import React, {FC, useState} from 'react';
import {DetailsForm} from "./DetailsForm";
import {Details} from "./Details";
import Title from "../../common/Title";

export const DetailsContainer: FC<PropsType> = (props) => {
    const {isOwner} = props

    const [editMode, setEditMode] = useState(false)

    const inputRef = React.useRef<any>(null);

    const detailsProps = {editMode, inputRef, setEditMode}

    return (
        <>
            <Title title={null} isOwner={isOwner} editMode={editMode} setEditMode={setEditMode}/>
            {editMode && isOwner
                ? <DetailsForm {...detailsProps}/>
                : <Details {...detailsProps}/>}
        </>
    );
}

type PropsType = {
    isOwner: boolean
}
