import express, { Request, Response } from 'express'

const router = express.Router()

/* ---- Client ---- */
router.get('/archive', (req: Request, res: Response) => {
  res.render('www/archive')
})

export default router
