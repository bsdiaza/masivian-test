require('dotenv').config()
import bodyParser from 'body-parser'
import createError from 'http-errors'
import express, { Application } from 'express'
import morgan from 'morgan'
import casinoRouter from './router/casino.router'
import { handleError } from './middlewares/errorHandler.middleware'

export default class App {

  public app: Application

  constructor() {
    this.app = express()
    this.setSettings()
    this.setMiddlewares()
    this.setRoutes()
    this.setMiddlewares()
  }

  setSettings() {
    this.app.set('port', process.env.PORT || 8080)
    this.app.use(morgan('dev'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({
      extended: true
    }))
  }

  setMiddlewares() {
    
  }

  setRoutes() {
    this.app.use('/api/casino', casinoRouter)
    this.app.use(function (req, res, next) {
      next(createError(404))
    })
    this.app.use(handleError)
  }

  async listen() {
    console.log('Server in port:', this.app.get('port'))
    return await this.app.listen(this.app.get('port'))
  }

}