import redis, { RedisClient } from 'redis'
import { redisFind, redisFindOne, redisRegister, generateId } from '../database.redis';
import Model from './model.class'

let rouletteRedis: RedisClient = redis.createClient()

class Roulette extends Model implements IRoulette {

  public static redisSuffix: string = 'bryamMasivian:roulette'

  public id: Number
  public state: String

  private constructor(id: Number) {
    super()
    this.id = id
    this.state = "new"
  }

  static async create() {
    const id = await generateId(Roulette.redisSuffix)
    const roulette = new Roulette(id)
    return roulette
  }

  static async findByid(id: Number): Promise<Roulette> {
    const roulette: any = await redisFindOne(`${this.redisSuffix}:${id}`)
    return roulette
  }

  static async find(): Promise<Array<Roulette>> {
    const roulettes = await redisFind(`${this.redisSuffix}`)
    return roulettes
  }

  static async openRouletteBets(id: Number): Promise<any> {
    const roulete = await this.findByid(id)
    if(!roulete)
      throw { status: 404, message: 'Roulette not found' }
    if(roulete.state)
      throw { status: 400, message: 'Roulette can not open bets' }
    
  }

}

export default Roulette