const initialState = {
    name: '',
    verify: false
}
const users = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USERS_SUCCESS':
            return {
                ...state,
                name: action.payload.name,
                // verify: action.verify.auth
            }
        case 'ADD_USERS_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'LOGIN_USERS_SUCCESS':
            return {
                ...state,
                // verify: action.verify.auth
            }
        // case 'VERTIFY_USERS_SUCCESS':
        //     return {
        //         ...state,
        //         verify: action.verify.auth
        //     }
        // case 'VERTIFY_USERS_ERROR':
        //     return {
        //         ...state,
        //         error: action.payload.error,
        //         verify: action.verify.auth
        //     }
        case 'LOGOUT_USER':
            return {
                ...state,
                verify: action.verify.auth
            }
        default:
            return {
                ...state
            }
    }
}

export default users;