import { Request, Response, NextFunction } from 'express'
import Roulette from '../data/classes/roulette.class'

export async function createRoulette(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const newRoulette = await Roulette.create()
    return res.status(200).json(newRoulette.id)
  } catch(err) {
    next(err)
    return res
  }
}
