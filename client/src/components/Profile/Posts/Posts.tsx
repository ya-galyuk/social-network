import React, {FC} from 'react';
import cls from './Posts.module.css'
import Post from "./Post/Post";
import PostForm from "./PostForm";
import {PostsType} from "../../../types/redux/ProfileTypes";

const Posts:FC<PropsType> = React.memo((props) => {
    const {posts, addPost} = props
    const postsElements = posts.map(post => <Post {...post} key={post.id}/>)

    const onSubmit = (formData: TPostFormData) => {
        addPost(formData.text)
    }

    return (
        <div className={cls.posts}>
            <h2 className={cls.posts__title}>My posts</h2>
            <PostForm onSubmit={onSubmit}/>
            {postsElements}
        </div>
    );
});

export default Posts;

type PropsType = {
    posts: Array<PostsType>
    addPost: (text: string) => void
}

export type TPostFormData = {
    text: string
}