import {COOKIE_TOKEN_NAME} from '../constants/index.js'

import jwt from 'jsonwebtoken'

import type {NextFunction, Request, Response} from 'express'

const JWT_SECRET = process.env.JWT_SECRET

export const createToken = (id: string, email: string, expiresIn: string) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not set.')
  }

  const token = jwt.sign({id, email}, JWT_SECRET, {expiresIn})

  return token
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not set.')
  }

  const token = req.signedCookies[COOKIE_TOKEN_NAME]

  if (!token || token.trim() === '') {
    return res.status(401).json({
      error: 'Token not received.',
    })
  }

  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, JWT_SECRET, (error: any, success: any) => {
      if (error) {
        reject(error.message)
        return res.status(401).json({
          error: 'Token has expired.',
        })
      }

      res.locals.jwtData = success
      resolve()
      return next()
    })
  })
}
