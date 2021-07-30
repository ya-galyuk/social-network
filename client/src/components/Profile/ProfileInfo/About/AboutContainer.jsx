import React, {useState} from 'react';
import AboutForm from "./AboutForm";
import About from "./About";

const AboutContainer = (props) => {
    const {profile, isOwner, saveProfileAbout} = props
    const initialFormValues = {about: profile.about}

    const [editMode, setEditMode] = useState(false)

    const onSubmit = (formData) => {
        saveProfileAbout(formData)
        setEditMode(false)
    }

    return (
        <>
            {editMode
                ? <AboutForm initialValues={initialFormValues} setEditMode={setEditMode} onSubmit={onSubmit}/>
                : <About isOwner={isOwner} about={profile.about} setEditMode={setEditMode}/>
            }
        </>
    );
}
;

export default AboutContainer;