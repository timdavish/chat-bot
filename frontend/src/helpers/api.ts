import axios from 'axios'

export const logIn = async (email: string, password: string) => {
  const res = await axios.post('/users/log-in', {email, password})

  if (res.status !== 200) {
    throw new Error('Failed to log in.')
  }

  return res.data
}

export const getAuthStatus = async () => {
  const res = await axios.get('/users/auth-status')

  if (res.status !== 200) {
    throw new Error('Failed to authenticate.')
  }

  return res.data
}

export const createChatMessage = async (content: string) => {
  const res = await axios.post('/chats/messages', {content})

  if (res.status !== 200) {
    throw new Error('Failed to create chat message')
  }

  return res.data
}
