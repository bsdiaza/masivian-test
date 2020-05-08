import { NextFunction, Request, Response } from 'express'

export function handleError(err: any, req: Request, res: Response, next: NextFunction): void {
  let payload: String
  console.log(err)
  if (err && err.status && err.status != 500) {
    payload = err.message
    res.status(err.status)
  } else {
    payload = "Internal server error"
    res.status(500)
  }
  res.json(payload).end()
}