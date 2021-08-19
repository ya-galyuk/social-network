import React, {FC, useState} from 'react';
import {DetailsForm} from "./DetailsForm";
import {Details} from "./Details";

export const DetailsContainer: FC<PropsType> = (props) => {
    const {isOwner} = props

    const [editMode, setEditMode] = useState(false)

    const inputRef = React.useRef<any>(null);

    const detailsProps = {editMode, inputRef, setEditMode}

    return (
        <>
            {editMode && isOwner
                ? <DetailsForm {...detailsProps}/>
                : <Details {...detailsProps}/>}
        </>
    );
}

type PropsType = {
    isOwner: boolean
}
