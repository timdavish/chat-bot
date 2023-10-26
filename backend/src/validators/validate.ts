import {ValidationChain, validationResult} from 'express-validator'

import type {NextFunction, Request, Response} from 'express'

export const validate = (validations: ValidationChain[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const errors = await validation.run(req)

      if (!errors.isEmpty()) {
        break
      }
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(422).json({errors: errors.array()})
    }

    next()
  }
