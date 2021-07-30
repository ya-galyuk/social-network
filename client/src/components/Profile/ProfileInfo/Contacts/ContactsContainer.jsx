import React, {useState} from 'react';
import ContactsForm from "./ContactsForm";
import Contacts from "./Contacts";

const ContactsContainer = (props) => {
    const {profile, isOwner, saveProfileContacts} = props
    const initialFormValues = {...profile.contacts}

    const [editMode, setEditMode] = useState(false)

    const onSubmit = (formData) => {
        saveProfileContacts(formData).then(() => {
            setEditMode(false)
        })
    }

    return (<>
        {editMode
            ? <ContactsForm initialValues={initialFormValues} profile={profile} setEditMode={setEditMode} onSubmit={onSubmit}/>
            : <Contacts profile={profile} isOwner={isOwner} setEditMode={setEditMode}/>
        }
    </>);
};

export default ContactsContainer;
