import React, {FC, useState} from 'react';
import {ContactsForm} from "./ContactsForm";
import {Contacts} from "./Contacts";
import cls from "../../Profile.module.css";
import {useSelector} from "react-redux";
import {getContacts} from "../../../../redux/selectors/profile-selectors";
import Title from "../../common/Title";

export const ContactsContainer: FC<PropsType> = (props) => {
    const {isOwner} = props

    const contacts = useSelector(getContacts)

    const [editMode, setEditMode] = useState(false)

    if (!contacts) return null

    return (
        <div className={cls.contacts}>
            <Title title={"Contact Info"} isOwner={isOwner} editMode={editMode} setEditMode={setEditMode}/>

            {editMode
                ? <ContactsForm contacts={contacts} setEditMode={setEditMode}/>
                : <Contacts contacts={contacts}/>
            }
        </div>
    )
};

type PropsType = {
    isOwner: boolean
}
