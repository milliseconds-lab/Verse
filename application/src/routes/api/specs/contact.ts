import express, { Request, Response } from 'express'
import { APIResult } from '../APIResult'

const router = express.Router()

/* ---- API - Contact ---- */
router.post('/request', (req: Request, res: Response) => {
  res.json(APIResult({}))
})

export default router