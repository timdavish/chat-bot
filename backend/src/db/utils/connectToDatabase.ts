import {connect} from 'mongoose'

export const connectToDatabase = async () => {
  try {
    await connect(process.env.DATABASE_URL)
  } catch (error) {
    console.error('Failed to connect to the database.')
    throw error
  }
}
