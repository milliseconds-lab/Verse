import express, { Request, Response } from 'express'

const router = express.Router()

/* ---- Client - Contact ---- */
router.get('/contact', (req: Request, res: Response) => {
  res.render('www/contact')
})

export default router
