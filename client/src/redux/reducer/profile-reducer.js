const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

let initialState = {
    posts: [
        {
            id: '1',
            time: 'time-1',
            text: 'post text 1',
        },
        {
            id: '2',
            time: 'time-2',
            text: 'Post text 2',
        },
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST : {
            let newPost = {id: '5', time: 'time-new', text: state.newPostText,}
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        default: {
            return state;
        }
    }
}

export const addPost = () => {
    return {type: ADD_POST}
}

export const updateNewPostText = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text}
}

export default profileReducer