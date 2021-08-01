import React from 'react';
import cls from "./Avatar.module.css";
import userPhoto from "../../../../assets/images/user.png";

const Avatar = (props) => {
    const {isOwner, photos, updatePhoto} = props

    const onPhotoSelected = (e) => {
        const files = e.target.files
        if (files.length) {
            updatePhoto(files[0])
        }
    }

    return (
        <div className={cls.info__avatar}>
            <img className={cls.info__img} src={photos.small || userPhoto} alt=""/>
            {isOwner && <input type={"file"} onChange={onPhotoSelected}/>}
        </div>
    );
};

export default Avatar;