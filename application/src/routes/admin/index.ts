import { Application } from 'express'

import home from './pages/home'
import archive from './pages/archive'

export default class AdminRouter {
  public routes(basePath: string, app: Application): void {
    app.use(basePath, home)
    app.use(basePath, archive)
  }
}
