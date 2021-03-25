const initialState = {
    name: '',
    verify: false
}
const users = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USERS_SUCCESS':
            return {
                ...state,
                name: action.payload.name
            }
        case 'ADD_USERS_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'LOGIN_USERS_SUCCESS':
            return {
                ...state
            }
        // case 'VERTIFY_USERS_SUCCESS':
        //     return {
        //         ...state,
        //         verify: action.payload.verify
        //     }
        // case 'VERTIFY_USERS_ERROR':
        //     return {
        //         ...state,
        //         error: action.payload.error
        //     }
        default:
            return {
                ...state
            }
    }
}

export default users;