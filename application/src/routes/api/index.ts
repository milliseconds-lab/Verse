import { Application } from 'express'
import archive from './archive'
import posts from './posts'

export default class APIRouter {
  public routes(basePath: string, app: Application) {
    app.use(basePath, archive)
    app.use(basePath, posts)
  }
}
