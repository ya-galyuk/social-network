import Posts from "./Posts";
import {connect} from "react-redux";
import {getPosts} from "../../../redux/selectors/profile-selectors";
import {actions} from "../../../redux/reducer/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {PostsType} from "../../../types/redux/ProfileTypes";

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    posts: getPosts(state),
})

export default connect(mapStateToProps, {
    addPost: actions.addPost,
})(Posts)

type MapStatePropsType = {
    posts: Array<PostsType>
}