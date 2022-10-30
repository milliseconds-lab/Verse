import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import UsersService from '../../../users/services/users.service'

const router = Router()

/* ---- Admin - Accounts ---- */
router.get('/login', (req: Request, res: Response) => {
  res.render('admin/accounts/login')
})

router.post('/login', async (req: Request, res: Response) => {
  const {
    body: { id, password }
  } = req
  const service = Container.get(UsersService)
  try {
    let administrator = await service.login(id, password)
    if (administrator !== undefined) {
      req.session.administrator = {
        userId: administrator.user_id,
        name: administrator.name
      }
      res.redirect('/admin/')
    } else {
      res.render('admin/accounts/login')
    }
  } catch (e) {
    res.render('admin/accounts/login')
  }
})

router.get('/signup', (req: Request, res: Response) => {
  res.render('admin/accounts/signup')
})

router.get('/logout', (req: Request, res: Response) => {
  req.session.destroy(() => {})
  res.redirect('/admin/login')
})

export default router
