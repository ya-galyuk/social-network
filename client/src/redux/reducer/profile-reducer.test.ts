import profileReducer, {actions} from "./profile-reducer";

let state = {
    posts: [
        {id: '1', time: 'time-1', text: 'post text 1',},
        {id: '2', time: 'time-2', text: 'Post text 2',},
    ],
    profile: null
}

test('length of posts should be incremented', () => {
    let action = actions.addPost("New post message")
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3)
});

test('message of new post should be correct', () => {
    let action = actions.addPost("New post message")
    let newState = profileReducer(state, action)
    expect(newState.posts[2].text).toBe("New post message")
});

test('after deleting length of posts should be decrement', () => {
    let action = actions.deletePost("1")
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(1)
});

test('after deleting length of posts shouldn`t be decrement if id incorrect', () => {
    let action = actions.deletePost("incorrect id")
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(2)
});


