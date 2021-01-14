const initialEvents = {
    startDate:'',
    endDate: '',
    data:[]
}

const events = (state=initialEvents,action) => {
    console.log(action.type)
    switch(action.type){
        case 'SEND_EVENT':
        console.log(action.payload.name)
        return {
            ...state,
        }
        default :
        return {
            ...state
        }
    }
}

export default events ; 