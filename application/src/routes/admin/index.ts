import { Application } from 'express'

import accounts from './pages/accounts'
import main from './pages/main'
import posts from './pages/posts'
import contact from './pages/contact'

export default class AdminRouter {
  public routes(basePath: string, app: Application): void {
    app.use(basePath, accounts)
    app.use(basePath, main)
    app.use(basePath, posts)
    app.use(basePath, contact)
  }
}
