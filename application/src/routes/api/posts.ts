import express, { Request, Response } from 'express'
import { APIResult } from './APIResult'

const router = express.Router()

router.get('/post/:post_id', (req: Request, res: Response) => {
  res.json(APIResult({}))
})

export default router
