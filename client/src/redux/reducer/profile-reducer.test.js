import profileReducer, {addPost, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: '1', time: 'time-1', text: 'post text 1',},
        {id: '2', time: 'time-2', text: 'Post text 2',},
    ],
}

test('length of posts should be incremented', () => {

    // 1. test data
    let action = addPost("New post message")

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(3)
});

test('message of new post should be correct', () => {

    // 1. test data
    let action = addPost("New post message")

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts[2].text).toBe("New post message")
});

test('after deleting length of posts should be decrement', () => {

    // 1. test data
    let action = deletePost("1")

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(1)
});

test('after deleting length of posts shouldn`t be decrement if id incorrect', () => {

    // 1. test data
    let action = deletePost(1)

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(2)
});


