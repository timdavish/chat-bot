import {Router} from 'express'

import {verifyToken} from '../../../utils/tokenManager.js'
import {chatsController} from '../../../controllers/index.js'
import {createChatCompletionValidator, validate} from '../../../validators/index.js'

export const chatsRouter = Router()

chatsRouter.post(
  '/',
  verifyToken,
  validate(createChatCompletionValidator),
  chatsController.createChatCompletion
)
