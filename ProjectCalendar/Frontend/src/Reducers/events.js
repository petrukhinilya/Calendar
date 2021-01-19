const initialEvents = {
    startDate: '',
    endDate: '',
    event: ''
}

const events = (state = initialEvents, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'SEND_EVENT':
            return {
                ...state,

            }
        default:
            return {
                ...state
            }
    }
}

export default events; 