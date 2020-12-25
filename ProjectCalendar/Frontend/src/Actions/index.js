export const addUser = (name, email, password) => async (dispatch) => {
  const response = await fetch('http://localhost:1234/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }

  })
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)

  dispatch({
    type: 'ADD_USER',
    name,
    email,
    password
  })
}
