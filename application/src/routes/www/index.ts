import { Application } from 'express'
import main from './pages/main'
import archive from './pages/archive'
import post from './pages/post'
import contact from './pages/contact'

export default class WWWRouter {
  public routes(basePath: string, app: Application): void {
    app.use(basePath, main)
    app.use(basePath, archive)
    app.use(basePath, post)
    app.use(basePath, contact)
  }
}
