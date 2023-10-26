import {config} from 'dotenv'

import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import {router} from './routes/index.js'

config()

export const app = express()

const cookieSecret = process.env.COOKIE_SECRET

app.use(express.json())
app.use(cookieParser(cookieSecret))
app.use(morgan('dev'))

app.use('/', router)
