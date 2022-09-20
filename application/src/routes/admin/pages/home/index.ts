import express, { Request, Response } from 'express'

const router = express.Router()

/* ---- Admin ---- */
router.get('/', (req: Request, res: Response) => {
  res.render('admin/home')
})

export default router
