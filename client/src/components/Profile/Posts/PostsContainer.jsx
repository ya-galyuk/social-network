// import React from 'react';
import {addPost, updateNewPostText} from "../../../redux/reducer/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
})

export default connect(mapStateToProps, {
    addPost,
    updateNewPostText
})(Posts)