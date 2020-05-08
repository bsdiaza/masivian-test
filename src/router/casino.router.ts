import { Router } from 'express'
import rouletteRouter from './roulette.router'

const casinoRouter = Router()

casinoRouter.use('/roulette', rouletteRouter) 

export default casinoRouter 