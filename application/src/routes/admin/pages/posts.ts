import { Router, Request, Response } from 'express'

const router = Router()

/* ---- Admin - Posts ---- */
router.get('/archive', (req: Request, res: Response) => {
  res.render('admin/post/list_post')
})

router.get('/post/new', (req: Request, res: Response) => {
  res.render('admin/post/form_post')
})

router.get('/post/edit', (req: Request, res: Response) => {
  res.render('admin/post/form_post')
})

router.get('/post/:post_id', (req: Request, res: Response) => {
  res.render('admin/post/view_post')
})

export default router
