import { Router, Request, Response } from 'express'

const router = Router()

/* ---- Admin - Main ---- */
router.get('/', (req: Request, res: Response) => {
  res.render('admin/main')
})

export default router
