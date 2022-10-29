import { Application } from 'express'
import city from './specs/city'
import posts from './specs/posts'
import request from './specs/request'
import pictures from './specs/pictures'

export default class APIRouter {
  public routes(basePath: string, app: Application) {
    app.use(basePath, city)
    app.use(basePath, posts)
    app.use(basePath, request)
    app.use(basePath, pictures)
  }
}
