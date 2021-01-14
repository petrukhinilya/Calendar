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

export const verifyUser = (email , password) => async (dispatch) => {

  try {

    const response = await fetch('http://localhost:1133/user/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({email, password })
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

export const addUserEvent = (inputStartDate,inputEndDate,inputText) => async (dispatch) => {
  try {
    const token = getToken()
    const response = await fetch('http://localhost:1133/event/addevent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({inputStartDate,inputEndDate,inputText,token})
    })
    const body = await response.json()

    dispatch({
      type: 'SEND_EVENT'
    })
  } catch (error) {
    console.log(error)
  }
}


