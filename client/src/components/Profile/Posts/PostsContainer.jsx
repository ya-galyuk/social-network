// import React from 'react';
import {addPost} from "../../../redux/reducer/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
})

export default connect(mapStateToProps, {
    addPost,
})(Posts)