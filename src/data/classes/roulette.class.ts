import redis, { RedisClient } from 'redis'
import { redisFind, redisFindOne, redisRegister, generateId, redisUpdate } from '../database.redis';
import Model from './model.class'

let rouletteRedis: RedisClient = redis.createClient()

class Roulette extends Model implements IRoulette {

  public static redisSuffix: string = 'bryamMasivian:roulette'

  public id: Number
  public state: string

  constructor(id: Number, state?: string ) {
    super()
    this.id = id
    this.state = state || "new"
  }

  static async create() {
    const id = await generateId(Roulette.redisSuffix)
    const roulette = new Roulette(id)
    await redisRegister(`${this.redisSuffix}:${id}`, roulette)
    return roulette
  }

  static async findByid(id: string): Promise<Roulette> {
    const roulette: any = await redisFindOne(`${this.redisSuffix}:${id}`)
    return roulette
  }

  static async find(): Promise<Array<Roulette>> {
    const roulettes = await redisFind(`${this.redisSuffix}`)
    return roulettes
  }

  async openBets(): Promise<void> {
    if (this.state !== 'new')
      throw { status: 400, message: 'Roulette bets state can not be changed to open' }
    this.state = 'open bets'
    await redisUpdate(`${Roulette.redisSuffix}:${this.id}`, this)
  }

}

export default Roulette