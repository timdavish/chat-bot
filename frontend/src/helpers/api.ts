import axios from "axios"

export const logIn = async (email: string, password: string) => {
  const res = await axios.post('/users/log-in', {email, password})

  if (res.status !== 200) {
    throw new Error('Failed to log in.')
  }

  return res.data
}
