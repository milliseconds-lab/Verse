import express, { Request, Response } from 'express'

const router = express.Router()

/* ---- Client ---- */
router.get('/post', (req: Request, res: Response) => {
  res.render('www/post')
})

export default router
