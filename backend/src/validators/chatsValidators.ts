import {body} from 'express-validator'

export const createChatMessageValidator = [
  body('content').notEmpty().withMessage('Content is invalid'),
]
