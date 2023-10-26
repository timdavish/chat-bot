import {Router} from 'express'

import {usersController} from '../../../controllers/index.js'
import {createUserValidator, validate} from '../../../validators/index.js'

export const usersRouter = Router()

usersRouter.get('/', usersController.getAllUsers)
usersRouter.post('/', validate(createUserValidator), usersController.createUser)
