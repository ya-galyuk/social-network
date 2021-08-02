import React, {ChangeEvent, FC} from 'react';
import cls from "./Avatar.module.css";
import userPhoto from "../../../../assets/images/user.png";
import {ProfilePhotosType} from "../../../../types/redux/ProfileTypes";

const Avatar: FC<PropsType> = (props) => {
    const {isOwner, photos, updatePhoto} = props

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files?.length) {
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

type PropsType = {
    isOwner: boolean
    photos: ProfilePhotosType
    updatePhoto: (file: File) => void
}