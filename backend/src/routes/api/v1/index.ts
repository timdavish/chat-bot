import {Router} from 'express'

import {chatsRouter} from './chats.js'
import {usersRouter} from './users.js'

export const v1Router = Router()

v1Router.use('/chats', chatsRouter)
v1Router.use('/users', usersRouter)
