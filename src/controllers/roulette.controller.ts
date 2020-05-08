import { Request, Response, NextFunction } from 'express'
import Roulette from '../data/classes/roulette.class'
import { searchRoulete } from '../services/roulette.service'
import Bet from '../data/classes/bet.class'

export async function createRoulette(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const newRoulette = await Roulette.create()
    return res.status(200).json(newRoulette.id)
  } catch(err) {
    next(err)
    return res
  }
}

export async function openRouletteBets(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { id } = req.params 
    const roulette = await searchRoulete(id)
    await roulette.openBets()
    return res.status(200).json(roulette)
  } catch(err) {
    next(err)
    return res
  }
}

export async function betOnRoulette(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { userid } = req.headers as { userid : string }
    const { rouletteId, quantity, color, number } = req.body 
    await searchRoulete(rouletteId)
    const bet = await Bet.create({ userId: userid ,rouletteId, quantity, color, number })
    return res.status(200).json(bet)
  } catch(err) {
    next(err)
    return res
  }
}