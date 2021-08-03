import React, {ChangeEvent, FC, useEffect, useState} from 'react';

const ProfileStatus:FC<PropsType> = (props) => {
    const {status, updateProfileStatus} = props

    let [editMode, setEditMode] = useState(false)
    let [statusValue, setStatus] = useState(status)

    useEffect(() => {
        setStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        if (updateProfileStatus) {
            updateProfileStatus(statusValue)
        }
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setStatus(value)
    }

    return <>
        {!editMode
            ? <span onDoubleClick={activateEditMode}>{status || "----"}</span>
            : <input value={statusValue} onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true}/>
        }
    </>
}

export default ProfileStatus;

type PropsType = {
    status: string
    updateProfileStatus?: (status: string) => void
}