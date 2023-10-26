import {body} from 'express-validator'

export const logInUserValidator = [
  body('email').trim().isEmail().withMessage('Email is invalid'),
  body('password').trim().isLength({min: 6}).withMessage('Password should contain at least 6 characters'),
]

export const signUpUserValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  ...logInUserValidator,
]
