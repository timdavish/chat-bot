import {Router} from 'express'

import {apiRouter} from './api/index.js'
import {healthRouter} from './health.js'

export const router = Router()

router.use('/api', apiRouter)
router.use('/health', healthRouter)
