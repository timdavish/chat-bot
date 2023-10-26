import {body} from 'express-validator'

export const createUserValidator = [
  body('email').trim().isEmail().withMessage('Email is invalid'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('password').trim().isLength({min: 6}).withMessage('Password should contain at least 6 characters'),
]
