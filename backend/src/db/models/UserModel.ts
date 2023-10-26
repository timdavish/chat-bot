import {model} from 'mongoose'
import { userSchema } from '../schemas/index.js'

export const UserModel = model('User', userSchema)
