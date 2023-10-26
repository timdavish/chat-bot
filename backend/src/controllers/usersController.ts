import {hash} from 'bcrypt'
import {UserModel} from "../db/models/UserModel.js"

import type {NextFunction, Request, Response} from 'express'

export const createUser = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const {email, name, password} = req.body

    const hashedPassword = await hash(password, 10)

    const user = new UserModel({
      email,
      name,
      password: hashedPassword,
    })

    await user.save()

    return res.status(200).json({
      status: 'OK',
      userId: user._id.toString(),
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      error: error.message,
      status: 'ERROR',
    })
  }
}

export const getAllUsers = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const users = await UserModel.find()

    return res.status(200).json({
      status: 'OK',
      users,
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      error: error.message,
      status: 'ERROR',
    })
  }
}
