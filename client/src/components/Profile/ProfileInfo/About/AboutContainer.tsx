import React, {FC, useState} from 'react';
import AboutForm from "./AboutForm";
import About from "./About";
import {ProfileType} from "../../../../types/redux/ProfileTypes";

const AboutContainer: FC<PropsType> = (props) => {
    const {profile, isOwner, saveProfileAbout} = props
    const initialFormValues = {about: profile.about}

    const [editMode, setEditMode] = useState(false)

    const onSubmit = (formData: TAboutFormData) => {
        saveProfileAbout(formData.about)
        setEditMode(false)
    }

    return (
        <>
            {editMode
                ? <AboutForm initialValues={initialFormValues} onSubmit={onSubmit}/>
                : <About isOwner={isOwner} about={profile.about} setEditMode={setEditMode}/>
            }
        </>
    );
}
;

export default AboutContainer;

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    saveProfileAbout: (about: string | null) => void
}

export type TAboutFormData = {
    about: string | null
}