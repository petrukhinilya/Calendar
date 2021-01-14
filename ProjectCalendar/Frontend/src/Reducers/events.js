const initialEvents = {
    startDate: '',
    endDate: '',
    data: ''
}

const events = (state = initialEvents, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'SEND_EVENT':
            console.log(action.payload.startDate)
            return {
                ...state,
                // startDate: action.payload.startDate,
                // endDate: action.payload.endDate,
                // date: action.payload.date
            }
        default:
            return {
                ...state
            }
    }
}

export default events; 