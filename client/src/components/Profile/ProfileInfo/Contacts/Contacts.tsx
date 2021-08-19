import React, {FC} from 'react';
import {Contact} from "./Contact/Contact";
import {v4 as uuidv4} from "uuid";
import {IProfileContacts} from "../../../../types/redux/ProfileTypes";


export const Contacts: FC<PropsType> = props => {
    const {contacts} = props

    const renderContactComponent = (key: string) => {
        const value = contacts[key as keyof IProfileContacts]
        if (value) return <Contact key={uuidv4()} itemTitle={key} value={value}/>
    }

    const contactElements = Object.keys(contacts).map(key => renderContactComponent(key))

    return <>
        {contactElements}
    </>
};

type PropsType = {
    contacts: IProfileContacts
}