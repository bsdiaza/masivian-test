import redis, { RedisClient } from 'redis'
import { redisFind, redisRegister, generateId } from '../database.redis';
import Model from './model.class'

class Bet extends Model implements IBet {

  public static redisSuffix: string = 'bryamMasivian:bet'

  public id: Number
  public userId: string
  public rouletteId: Number
  public quantity: Number
  public color: string
  public number?: Number

  constructor({ id, userId, rouletteId, quantity, color, number }: IBet) {
    super()
    this.id = id || 0
    this.userId = userId
    this.rouletteId = rouletteId
    this.quantity = quantity
    this.color = color
    this.number = number
  }

  static async create({ userId, rouletteId, quantity, color, number }: IBet) {
    const id = await generateId(Bet.redisSuffix)
    const bet = new Bet({id, userId, rouletteId, quantity, color, number})
    console.log(`${this.redisSuffix}:${rouletteId}:${id}`, bet)
    await redisRegister(`${this.redisSuffix}:${rouletteId}:${id}`, bet)
    return bet
  }

  static async findByRoulette(rouletteId: string): Promise<Array<Bet>> {
    const bets = await redisFind(`${this.redisSuffix}:${rouletteId}`)
    return bets
  }

}

export default Bet