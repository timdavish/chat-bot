import {compare, hash} from 'bcrypt'
import {createToken} from '../utils/tokenManager.js'
import {UserModel} from '../db/models/UserModel.js'

import type {NextFunction, Request, Response} from 'express'

import {COOKIE_TOKEN_NAME, COOKIE_TOKEN_OPTIONS} from '../constants/index.js'

export const getAllUsers = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const users = await UserModel.find()

    return res.status(200).json({
      status: 'OK',
      users,
    })
  } catch (error: any) {
    console.error(error)

    return res.status(500).json({
      error: error.message,
      status: 'ERROR',
    })
  }
}

export const logInUser = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const {email, password} = req.body

    const user = await UserModel.findOne({email})

    if (!user) {
      return res.status(401).json({
        error: 'User does not exist',
        status: 'ERROR',
      })
    }

    const isPasswordCorrect = await compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(403).json({
        error: 'Password is incorrect',
        status: 'ERROR',
      })
    }

    res.clearCookie(COOKIE_TOKEN_NAME, COOKIE_TOKEN_OPTIONS)

    const token = createToken(user._id.toString(), email, '7d')
    const expiresDate = new Date()
    expiresDate.setDate(expiresDate.getDate() + 7)

    res.cookie(COOKIE_TOKEN_NAME, token, {
      ...COOKIE_TOKEN_OPTIONS,
      expires: expiresDate,
    })

    return res.status(200).json({
      status: 'OK',

      email: user.email,
      id: user._id.toString(),
      name: user.name,
    })
  } catch (error: any) {
    console.error(error)

    return res.status(500).json({
      error: error.message,
      status: 'ERROR',
    })
  }
}

export const signUpUser = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const {email, name, password} = req.body

    const existingUser = await UserModel.findOne({email})

    if (existingUser) {
      return res.status(401).json({
        error: 'User already exists',
        status: 'ERROR',
      })
    }

    const hashedPassword = await hash(password, 10)

    const user = new UserModel({
      email,
      name,
      password: hashedPassword,
    })

    await user.save()

    res.clearCookie(COOKIE_TOKEN_NAME, COOKIE_TOKEN_OPTIONS)

    const token = createToken(user._id.toString(), email, '7d')
    const expiresDate = new Date()
    expiresDate.setDate(expiresDate.getDate() + 7)

    res.cookie(COOKIE_TOKEN_NAME, token, {
      ...COOKIE_TOKEN_OPTIONS,
      expires: expiresDate,
    })

    return res.status(201).json({
      status: 'OK',

      email: user.email,
      id: user._id.toString(),
      name: user.name,
    })
  } catch (error: any) {
    console.error(error)

    return res.status(500).json({
      error: error.message,
      status: 'ERROR',
    })
  }
}
