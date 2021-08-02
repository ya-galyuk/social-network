import React, {FC, useState} from 'react';
import ContactsForm from "./ContactsForm";
import Contacts from "./Contacts";
import {ProfileContactsType, ProfileType} from "../../../../types/redux/ProfileTypes";

const ContactsContainer: FC<PropsType> = (props) => {
    const {profile, isOwner, saveProfileContacts} = props
    const initialFormValues = {...profile.contacts}

    const [editMode, setEditMode] = useState<boolean>(false)

    const onSubmit = (formData: TContactsFormData) => {
        saveProfileContacts({...formData}).then(() => {
            setEditMode(false)
        })
    }

    return (<>
        {editMode
            ? <ContactsForm initialValues={initialFormValues} contacts={profile.contacts} onSubmit={onSubmit}/>
            : <Contacts contacts={profile.contacts} isOwner={isOwner} setEditMode={setEditMode}/>
        }
    </>);
};

export default ContactsContainer;

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    saveProfileContacts: (contacts: ProfileContactsType) => Promise<void>
}

export type TContactsFormData = ProfileContactsType