import { saveToken, getToken } from '../utils/utils'


export const addUser = (name, email, password) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:1133/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ name, email, password })
    })
    const body = await response.json()

    const { data: { token } } = body
    saveToken(token)

    dispatch({
      type: 'ADD_USERS_SUCCESS',
      payload: { name }
    })

  } catch (error) {
    console.error(error)
    dispatch({
      type: 'ADD_USERS_ERROR',
      payload: { error }
    })
  }


}

export const verifyUser = (email, password) => async (dispatch) => {

  try {

    const response = await fetch('http://localhost:1133/user/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ email, password })
    })
    const body = await response.json()

    console.log(body)

    const { data: { token } } = body
    saveToken(token)

    dispatch({
      type: 'LOGIN_USERS_SUCCESS'
    })
  } catch (error) {
    console.log(error)
  }
}

export const addUserEvent = (inputStartDate, inputEndDate, event) => async (dispatch) => {
  try {
    const startDate = Number(new Date(inputStartDate).getTime());
    const endDate = Number(new Date(inputEndDate).getTime());

    const token = getToken()
    const response = await fetch('http://localhost:1133/event/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ startDate, endDate, event, token })
    })

    const body = await response.json()
    dispatch({
      type: 'SEND_EVENT',
      startDate,
      endDate,
      event: { body }
    })
  } catch (error) {
    console.log(error)
  }
}

export const getUserEvent = () => async (dispatch) => {
  try {
    const token = getToken()
    const response = await fetch(`http://localhost:1133/event/get?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })

    const events = await response.json();

    dispatch({
      type: 'GET_EVENTS',
      payload: { events }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'GET_EVENTS_ERROR',
      payload: { error }
    })
  }
}

export const deleteUserEvent = (id) => async (dispatch) => {
  try {
    const token = getToken()
    const response = await fetch(`http://localhost:1133/event/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body:JSON.stringify({id, token})
    })

    const events = await response.json();

    dispatch({
      type: 'DELETE_EVENTS',
      payload: { events }
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'DELETE_EVENTS_ERROR',
      payload: { error }
    })
  }
}

export const updateUserEvent = (id, inputStartDate, inputEndDate, event) => async (dispatch) => {
  try {
    const token = getToken()
    const startDate = Number(new Date(inputStartDate).getTime());
    const endDate = Number(new Date(inputEndDate).getTime());

    const response = await fetch(`http://localhost:1133/event/${id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body:JSON.stringify({id, startDate, endDate, event, token})
    })

    const events = await response.json();

    dispatch({
      type: 'UPDATE_EVENTS',
      payload: { events }
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'UPDATE_EVENTS_ERROR',
      payload: { error }
    })
  }
}


