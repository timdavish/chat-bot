import {Router} from 'express'

import {usersController} from '../../../controllers/index.js'
import {logInUserValidator, signUpUserValidator, validate} from '../../../validators/index.js'

export const usersRouter = Router()

usersRouter.get('/', usersController.getAllUsers)

usersRouter.post('/log-in', validate(logInUserValidator), usersController.logInUser)
usersRouter.post('/sign-up', validate(signUpUserValidator), usersController.signUpUser)
