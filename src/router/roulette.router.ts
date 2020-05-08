import { Router } from 'express'
import { createRoulette, openRouletteBets, betOnRoulette } from '../controllers/roulette.controller'

const rouletteRouter = Router()

rouletteRouter.post('/', createRoulette)
rouletteRouter.post('/open-bets/:id', openRouletteBets) 
rouletteRouter.post('/bet', betOnRoulette) 
rouletteRouter.post('/close-bets/:id', createRoulette) 

export default rouletteRouter 