import React, {createElement, FC, useState} from 'react';
import cls from './Post.module.css'
import {Avatar, Comment, List, Space} from "antd";
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, UserOutlined} from "@ant-design/icons";
import {PostsType} from "../../../../types/redux/ProfileTypes";

export const Post: FC<PropsType> = (props) => {
    const {item} = props

    const likes = 0
    const dislikes = 0

    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    const onLike = () => {
        setLike(!like);
        setDislike(false);
    };

    const onDislike = () => {
        setLike(false);
        setDislike(!dislike);
    };

    const actions = [
        <Space onClick={onLike} className={cls.post__action}>
            {createElement(like ? LikeFilled : LikeOutlined)}
            <span className="comment-action">{likes + (+like)}</span>
        </Space>,
        <Space onClick={onDislike} className={cls.post__action}>
            {React.createElement(dislike ? DislikeFilled : DislikeOutlined)}
            <span className="comment-action">{dislikes + (+dislike)}</span>
        </Space>,
    ];

    return (
        <List.Item key={item.id}>
            <Comment
                actions={actions}
                author={item.author}
                avatar={item.avatar || <Avatar icon={<UserOutlined/>}/>}
                content={item.content}
                datetime={item.datetime}
            />
        </List.Item>
    );
};

type PropsType = {
    item: PostsType
}
