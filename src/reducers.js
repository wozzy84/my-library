function userReducer(state = {}, action) {
    switch(action.type) {
    case "LOGGED_USER":
        return  action.user
    default:return state
    }
}

export {userReducer}