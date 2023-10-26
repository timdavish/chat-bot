import {Router} from 'express'

export const healthRouter = Router()

healthRouter.get('/', (_req, res, _next) => {
  res.sendStatus(200)
})
