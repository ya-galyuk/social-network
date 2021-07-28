import React from 'react';
import cls from "./Contact.module.css";

const Contact = (props) => {
    const {contact} = props
    return (
        <p className={cls.contacts__item}>
            <span>{contact.name}: </span>
            <a href={contact.name.toLowerCase() === 'email' ? `mailto:${contact.url}` : contact.url}>{contact.url}</a>
        </p>
    );
};

export default Contact;