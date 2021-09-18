import React, {FC, useState} from 'react';
import cls from "./Avatar.module.css";
import {CameraOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, message, Upload} from "antd";
import ImgCrop from 'antd-img-crop';
import {RcFile} from "antd/es/upload";
import {UploadFile} from "antd/lib/upload/interface";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {gql, useMutation} from "@apollo/client";
import {getAuthorizedUserId} from "../../../../redux/selectors/auth-selectors";
import {useMessageError, useMessageLoading} from "../../../../hooks/message-hook";
import {GET_USER} from "../../ProfileContainer";


export const AvatarContainer: FC<PropsType> = (props) => {
    const {editMode} = props

    const userId = useSelector(getAuthorizedUserId)
    const [photos, setPhotos] = useState<IUserPhoto | null>(null)

    const [photoUpload, {loading, error}] = useMutation(PHOTO_UPLOAD_MUTATION, {
        refetchQueries: [GET_USER, 'GetUser'],
    });

    useMessageError(error)
    useMessageLoading(loading)

    const onPreview = async (file: UploadFile) => {
        let src: any = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                if (file.originFileObj) {
                    reader.readAsDataURL(file.originFileObj);
                }
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const onChange = (info: any) => {
        const {target: {validity, files: [file]}} = info
        validity.valid && photoUpload({variables: {file}});
    }

    return (
        <div style={{position: "relative"}}>
            <Avatar shape={"circle"} size={150} src={photos?.small} icon={<UserOutlined/>}/>
            {editMode
            && <div className={classNames(cls.upload, 'profile__upload')}>
                <ImgCrop shape={"round"}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onPreview={onPreview}
                        onChange={onChange}
                    >
                        <CameraOutlined style={{fontSize: 48, color: "var(--primary)"}}/>
                    </Upload>
                </ImgCrop>
            </div>}
        </div>
    );
}

type PropsType = {
    editMode: boolean
}

const PHOTO_UPLOAD_MUTATION = gql`
    mutation PhotoUpload($file: Upload!) {
        photoUpload(file: $file) {
            filename
            mimetype
            encoding
            url
        }
    }
`;

interface IUserPhoto {
    small: string | null;
    large: string | null;
}