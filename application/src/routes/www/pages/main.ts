import express, { Request, Response } from 'express'

const router = express.Router()

/* ---- Client - Main ---- */
router.get('/', (req: Request, res: Response) => {
  res.render('www/main')
})

export default router
