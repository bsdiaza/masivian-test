import { Request, Response, NextFunction } from 'express'
import Roulette from '../data/classes/roulette.class'
import { searchRoulette, validateRouleteState } from '../services/roulette.service'
import Bet from '../data/classes/bet.class'

export async function createRoulette(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const newRoulette = await Roulette.create()
    return res.status(200).json({ rouletteId: newRoulette.id })
  } catch(err) {
    next(err)
    return res
  }
}

export async function findRoulette(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { id } = req.params
    const roulette = await searchRoulette(id)
    const bets = await Bet.findByRoulette(id)
    return res.status(200).json({ roulette, bets})
  } catch(err) {
    next(err)
    return res
  }
}

export async function listRoulettes(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const roulettes = await Roulette.find()
    return res.status(200).json(roulettes)
  } catch(err) {
    next(err)
    return res
  }
}

export async function openRouletteBets(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { id } = req.params 
    const roulette = await searchRoulette(id)
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
    const { rouletteId, quantity, option } = req.body 
    await validateRouleteState(rouletteId)
    const bet = await Bet.create({ userId: userid ,rouletteId, quantity, option })
    return res.status(200).json(bet)
  } catch(err) {
    next(err)
    return res
  }
}

export async function closeRouletteBets(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { id } = req.params 
    const roulette = await searchRoulette(id)
    await roulette.playRoulette()
    const bets = await Bet.findByRoulette(id)
    return res.status(200).json({ roulette, bets })
  } catch(err) {
    next(err)
    return res
  }
}