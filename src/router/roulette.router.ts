import { Router } from 'express'
import { createRoulette } from '../controllers/roulette.controller'

const rouletteRouter = Router()

rouletteRouter.post('/', createRoulette)  

export default rouletteRouter 