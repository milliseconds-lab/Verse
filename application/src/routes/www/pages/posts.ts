import express, { Request, Response } from 'express'

const router = express.Router()

/* ---- Client - Posts ---- */
router.get('/archive', (req: Request, res: Response) => {
  res.render('www/archive')
})

router.get('/post/:post_id', (req: Request, res: Response) => {
  res.render('www/post')
})

export default router
