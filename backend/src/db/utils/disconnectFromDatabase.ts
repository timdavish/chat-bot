import {disconnect} from 'mongoose'

export const disconnectFromDatabase = async () => {
  try {
    await disconnect()
  } catch (error) {
    console.error('Failed to disconnect from the database.')
    throw error
  }
}
