import React, {FC} from 'react';
import cls from './Posts.module.css'
import {Post} from "./Post/Post";
import {PostForm} from "./PostForm";
import {PostsType} from "../../../types/redux/ProfileTypes";
import {getPosts} from "../../../redux/selectors/profile-selectors";
import {useSelector} from "react-redux";
import {List} from "antd";
import Title from "../common/Title";

export const Posts: FC<PropsType> = React.memo((props) => {
    const posts: Array<PostsType> = useSelector(getPosts)
    return (
        <div className={cls.posts}>
            <Title title={"My posts"} editable={false}/>
            <PostForm/>
            <List
                itemLayout="vertical"
                pagination={posts.length > 5 && {pageSize: 5}}
                dataSource={posts}
                renderItem={item => <Post item={item}/>}
            />
        </div>
    );
});

type PropsType = {}