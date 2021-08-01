import {addPost} from "../../../redux/reducer/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {getPosts} from "../../../redux/selectors/profile-selectors";

let mapStateToProps = (state) => ({
    posts: getPosts(state),
})

export default connect(mapStateToProps, {
    addPost,
})(Posts)