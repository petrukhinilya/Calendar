const initialEvents = {
    startDate: '',
    endDate: '',
    events: [],
}

const events = (state = initialEvents, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'SEND_EVENT':
            return {
                ...state,
            }
        case 'GET_EVENTS':
            return {
                ...state,
                events: action.payload.events
            }
        default:
            return {
                ...state
            }
    }
}

export default events; 