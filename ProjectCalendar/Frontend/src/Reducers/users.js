const initialState = {
    name: '',
}
const users = (state=initialState,action) => {
    switch(action.type){
        case 'ADD_USERS_SUCCESS':
        return {
            ...state,
            name: action.payload.name
        }
        case 'ADD_USERS_ERROR':
        return {
            ...state,
            error:action.payload.error
        }
        case 'LOGIN_USERS_SUCCESS':
        return {
            ...state
        }
        default :
        return {
            ...state
        }
    }
}

export default users ; 