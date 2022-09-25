import express, { Request, Response } from 'express'

const router = express.Router()

/* ---- Admin - Main ---- */
router.get('/', (req: Request, res: Response) => {
  res.render('admin/main')
})

export default router
