import express, { Request, Response } from 'express'

const router = express.Router()

/* ---- Admin - Contact ---- */
router.get('/contacts', (req: Request, res: Response) => {
  res.render('admin/contact/list_contact')
})

router.get('/contact/:contact_id', (req: Request, res: Response) => {
  res.render('admin/contact/view_contact')
})

export default router
