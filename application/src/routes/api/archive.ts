import express, { Request, Response } from 'express'
import { APIResult } from './APIResult'

const router = express.Router()

// const COUNT_PER_PAGE = 10

router.get('/archive', async (req: Request, res: Response) => {
  // const page = req.query.page !== undefined ? Number(req.query.page) : 1
  // const offset = page > 1 ? COUNT_PER_PAGE * (page - 1) : 0
  res.json(APIResult([]))
})

export default router
