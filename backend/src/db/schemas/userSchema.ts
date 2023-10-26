import {Schema} from 'mongoose'
import {chatSchema} from './chatSchema.js'

export const userSchema = new Schema({
  chats: [chatSchema],
  email: {
    type: 'String',
    required: true,
    unique: true,
  },
  name: {
    type: 'String',
    required: true,
  },
  password: {
    type: 'String',
    required: true,
  },
})
