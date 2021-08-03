import usersReducer, {actions, InitialStateType} from "./users-reducer";

let store: InitialStateType

beforeEach(() => {
    store = {
        users: [
            {
                id: "0",
                fullName: "fullName 0",
                about: null,
                status: null,
                location: {city: null, country: null},
                photos: {large: null, small: null},
                followed: false
            },
            {
                id: "1",
                fullName: "fullName 1",
                about: null,
                status: null,
                location: {city: null, country: null},
                photos: {large: null, small: null},
                followed: false
            },
            {
                id: "2",
                fullName: "fullName 2",
                about: null,
                status: null,
                location: {city: null, country: null},
                photos: {large: null, small: null},
                followed: true
            },
            {
                id: "3",
                fullName: "fullName 3",
                about: null,
                status: null,
                location: {city: null, country: null},
                photos: {large: null, small: null},
                followed: true
            }
        ],
        pageSize: 3,
        totalCount: 0,
        currentPage: 1,
        isLoading: false,
        followingInProgress: []
    }
})

test("follow success", () => {
    const newState = usersReducer(store, actions.onFollow("1"))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test("unfollow success", () => {
    const newState = usersReducer(store, actions.onUnfollow("3"))
    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
})


