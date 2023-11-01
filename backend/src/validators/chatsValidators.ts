import {body} from 'express-validator'

export const createChatCompletionValidator = [
  body('message').notEmpty().withMessage('Message is invalid'),
]
