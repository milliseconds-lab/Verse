import express, { NextFunction, Request, Response } from 'express'

require('express-async-errors')
import createError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import compression from 'compression'
import session from 'express-session'
import config from '../config'
import WWWRouter from './routes/www'
import AdminRouter from './routes/admin'

class App {
  public app: express.Application
  public APP_SECRET = 'verse-secret'
  public static PROJECT_DIR = config.PROJECT_DIR

  constructor() {
    this.app = express()
  }

  public setup(): void {
    this.config()
    this.setupRoutes()
  }

  private config(): void {
    this.app.use(compression())
    this.app.use(
      session({
        secret: this.APP_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }
      })
    )
    this.app.set('views', path.join(config.PROJECT_DIR, 'views'))
    this.app.set('view engine', 'ejs')
    this.app.use(morgan('combined'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cookieParser(this.APP_SECRET))
    this.app.use(express.static(path.join(config.PROJECT_DIR, 'public')))
  }

  private setupRoutes(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.url = req.originalUrl
      res.locals.host = req.get('host')
      res.locals.protocol = req.protocol
      next()
    })

    new WWWRouter().routes('/', this.app)
    new AdminRouter().routes('/admin', this.app)

    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        next(createError(404))
      }
    )

    this.app.use((err: any, req: express.Request, res: express.Response) => {
      App.handleWebError(err, req, res)
    })
  }

  private static handleApiError(
    err: any,
    req: express.Request,
    res: express.Response
  ): void {
    res.status(err.status ? err.status : 500).json({
      success: false,
      code: err.code ? err.code : 500,
      message: err.message
    })
  }

  private static handleWebError(
    err: any,
    req: express.Request,
    res: express.Response
  ): void {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  }
}

export default App
