import { Application } from 'express'
import posts from './specs/posts'
import contact from './specs/contact'

export default class APIRouter {
  public routes(basePath: string, app: Application) {
    app.use(basePath, posts)
    app.use(basePath, contact)
  }
}
