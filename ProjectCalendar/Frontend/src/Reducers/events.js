const initialEvents = {
    startDate: '',
    endDate: '',
    events: []
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
        case 'GET_EVENTS_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'DELETE_EVENTS':
            return {
                ...state,
                events: action.payload.events
            }
        case 'DELETE_EVENTS_ERROR':
            return {
                ...state,
                error: action.payload.error
            }
        case 'UPDATE_EVENTS':
            return {
                ...state,
                events: action.payload.events
            }
        case 'UPDATE_EVENTS_ERROR':
            return {
                ...state,
                error: action.payload.error
            }

        default:
            return {
                ...state
            }
    }
}

export default events; 