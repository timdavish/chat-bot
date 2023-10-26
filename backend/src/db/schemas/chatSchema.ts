import {Schema} from 'mongoose'

import {randomUUID} from 'crypto'

export const chatSchema = new Schema({
  content: {
    required: true,
    type: 'String',
  },
  id: {
    default: randomUUID(),
    required: true,
    type: 'String',
    unique: true,
  },
  role: {
    required: true,
    type: 'String',
  },
})
