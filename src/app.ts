import express, { Express, Request, Response } from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'

import morganMiddleware from './config/morganMiddleware'
import apiAuthRouters from './routes/api/auth'
import path from 'path'
import helmet from 'helmet'
import cors from 'cors'

const app: Express = express()
const PORT = process.env.APP_PORT
const PUBLIC_PATH = path.join(__dirname, '../public')

const getCorsOptions = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      origin: process.env.API_BASE_URL
    }
  }
  return undefined
}

/**
 * init security modules
 */
app.use(
  helmet({
    contentSecurityPolicy: true
  })
)
app.use(cors(getCorsOptions()))
app.use(express.json())

/**
 * bodyParser
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * init Logger
 */
app.use(morganMiddleware)

/**
 * static files
 * Serve Static files including the react app static bundle
 */
app.use(
  express.static(PUBLIC_PATH, {
    maxAge: 30 * 24 * 60 * 3600
  })
)

/**
 * init routers
 */
app.use('/api/auth', apiAuthRouters)

app.get('/', (req: Request, res: Response) => {
  res.sendFile(`${PUBLIC_PATH}/index.html`)
})

/**
 * not found handler
 */
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: `error`,
    message: `Not found`
  })
})

/**
 * init express-async-errors
 */
app.use((err: any, req: Request, res: Response, next: any) => {
  if (err) {
    res.status(err.status || 500).json({
      status: `error`,
      message: err.message
    })
  }
  next()
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
