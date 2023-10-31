import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import {router} from './routes/index.js'

const COOKIE_SECRET = process.env.COOKIE_SECRET

export const createApp = () => {
  const app = express()

  app.use(cookieParser(COOKIE_SECRET))
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:5173',
    })
  )
  app.use(express.json())
  app.use(morgan('dev'))

  app.use('/', router)

  return app
}
