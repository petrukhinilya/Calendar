const initialState = {
    name: '',
    email:'',
    password:''
}
const users = (state=initialState,action) => {
    switch(action.type){
        case 'ADD_USER':
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