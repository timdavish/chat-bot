import {Router} from 'express'

import {verifyToken} from '../../../utils/tokenManager.js'
import {chatsController} from '../../../controllers/index.js'
import {createChatMessageValidator, validate} from '../../../validators/index.js'

export const chatsRouter = Router()

chatsRouter.post(
  '/messages',
  verifyToken,
  validate(createChatMessageValidator),
  chatsController.createChatMessage
)
