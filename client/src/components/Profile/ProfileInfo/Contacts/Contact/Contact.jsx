import React from 'react';
import cls from "../Contacts.module.css";

const Contact = (props) => {
    const {itemTitle, value} = props
    return (
        <p className={cls.contacts__item}>
            <span>{itemTitle}: </span>
            <a href={itemTitle.toLowerCase() === 'email' ? `mailto:${value}` : value}>{value}</a>
        </p>
    );
};

export default Contact;