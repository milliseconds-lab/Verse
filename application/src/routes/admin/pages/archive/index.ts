import express, { Request, Response } from 'express'

const router = express.Router()

/* ---- Admin ---- */
router.get('/archive', (req: Request, res: Response) => {
  res.render('admin/archive/list')
})

export default router
