import React, {useEffect, useState} from 'react';

const ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserProfile(status)
    }

    const onStatusChange = (e) => {
        let value = e.currentTarget.value
        setStatus(value)
    }

    return <>
        {!editMode
            ? <span onDoubleClick={activateEditMode}>{props.status || "----"}</span>
            : <input value={status} onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}/>
        }
    </>
}

export default ProfileStatus;