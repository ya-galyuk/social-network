import React, {FC} from 'react';
import cls from "./Avatar.module.css";
import {CameraOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar, message, Upload} from "antd";
import ImgCrop from 'antd-img-crop';
import {RcFile} from "antd/es/upload";
import {UploadChangeParam, UploadFile} from "antd/lib/upload/interface";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {updatePhoto} from "../../../../redux/reducer/profile-reducer";
import {getPhotos} from "../../../../redux/selectors/profile-selectors";


export const AvatarContainer: FC<PropsType> = (props) => {
    const {editMode} = props

    const photos = useSelector(getPhotos)

    const dispatch = useDispatch()

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

    const onChange = async (info: UploadChangeParam) => {
        if (info.file.status === 'done' && info.file.originFileObj) {
            await dispatch(updatePhoto(info.file.originFileObj))
            message.success(`${info.file.name} file uploaded successfully`);
        }
        if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

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