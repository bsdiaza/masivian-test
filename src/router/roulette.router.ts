import { Router } from 'express'
import { createRoulette, openRouletteBets } from '../controllers/roulette.controller'

const rouletteRouter = Router()

rouletteRouter.post('/', createRoulette)
rouletteRouter.post('/open-bets/:id', openRouletteBets) 
rouletteRouter.post('/close-bets/:id', createRoulette) 

export default rouletteRouter 