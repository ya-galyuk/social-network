import Posts from "./Posts";
import {connect} from "react-redux";
import {getPosts} from "../../../redux/selectors/profile-selectors";
import {actions} from "../../../redux/reducer/profile-reducer";

let mapStateToProps = (state) => ({
    posts: getPosts(state),
})

export default connect(mapStateToProps, {
    addPost: actions.addPost,
})(Posts)