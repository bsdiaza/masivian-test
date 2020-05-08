import { Router } from 'express'
import { createRoulette, openRouletteBets, betOnRoulette, 
  closeRouletteBets, listRoulettes, findRoulette } from '../controllers/roulette.controller'

const rouletteRouter = Router()

rouletteRouter.get('/', listRoulettes)
rouletteRouter.get('/:id', findRoulette)
rouletteRouter.post('/', createRoulette)
rouletteRouter.post('/open-bets/:id', openRouletteBets) 
rouletteRouter.post('/bet', betOnRoulette) 
rouletteRouter.post('/close-bets/:id', closeRouletteBets) 

export default rouletteRouter 