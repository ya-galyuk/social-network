// import React from 'react';
import {addPost} from "../../../redux/reducer/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getNewPostText, getPosts} from "../../../redux/selectors/profile-selectors";

let mapStateToProps = (state) => ({
    posts: getPosts(state),
    newPostText: getNewPostText(state)
})

export default connect(mapStateToProps, {
    addPost,
})(Posts)