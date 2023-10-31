import {connect} from 'mongoose'

const DATABASE_URL = process.env.DATABASE_URL

export const connectToDatabase = async () => {
  try {
    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL not set.')
    }

    await connect(DATABASE_URL)
  } catch (error) {
    console.error('Failed to connect to the database.')
    throw error
  }
}
