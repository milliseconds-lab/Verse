import { Router, Request, Response } from 'express'

const router = Router()

/* ---- Client - Main ---- */
router.get('/', (req: Request, res: Response) => {
  res.render('www/main')
})

export default router
