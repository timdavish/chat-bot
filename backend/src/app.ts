import {config} from 'dotenv'

import express from 'express'
import morgan from 'morgan'

import {router} from './routes/index.js'

config()

export const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/', router)
