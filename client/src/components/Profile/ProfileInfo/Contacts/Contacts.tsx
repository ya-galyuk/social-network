import React, {FC} from 'react';
import cls from "../ProfileInfo.module.css";
import Contact from "./Contact/Contact";
import {v4 as uuidv4} from "uuid";
import clsProfile from "../ProfileInfo.module.css";
import EditIcon from "../../../../assets/icons/edit.svg";
import {ProfileContactsType} from "../../../../types/redux/ProfileTypes";

const Contacts: FC<PropsType> = props => {
    const {contacts, isOwner, setEditMode} = props

    const renderContactComponent = (key: string) => {
        const value = contacts[key as keyof ProfileContactsType]
        if (value) return <Contact key={uuidv4()} itemTitle={key} value={value}/>
    }

    const contactElements = Object.keys(contacts)
        .map(key => renderContactComponent(key))

    return (
        <div className={cls.contacts}>
            {isOwner && <button className={clsProfile.btn__edit} onClick={() => setEditMode(true)}>
                <img src={EditIcon} alt="Edit Icon"/></button>}
            <h3 className={cls.contacts__title}>Contact Info</h3>
            {contactElements}
        </div>
    );
};

export default Contacts;

type PropsType = {
    contacts: ProfileContactsType
    isOwner: boolean
    setEditMode: (editMode: boolean) => void
}