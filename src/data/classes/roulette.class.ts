import redis, { RedisClient } from 'redis'
import { redisFind, redisFindOne, redisRegister, generateId, redisUpdate } from '../database.redis';
import Model from './model.class'
import { generateResult, mapResult } from '../../services/roulette.service';
import Bet from './bet.class';

let rouletteRedis: RedisClient = redis.createClient()

class Roulette extends Model implements IRoulette {

  public static redisSuffix: string = 'bryamMasivian:roulette'

  public id: string
  public state: string
  public result?: IRouletteResult

  constructor(id: string, state?: string ) {
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
    let roulette: any = await redisFindOne(`${this.redisSuffix}:${id}`)
    roulette = mapResult(roulette)
    return roulette
  }

  static async find(): Promise<Array<Roulette>> {
    let roulettes = await redisFind(`${this.redisSuffix}`)
    roulettes = roulettes.map(mapResult)
    return roulettes
  }

  async openBets(): Promise<void> {
    this.state = 'roulette open'
    await Bet.deleteByRoulette(this.id)
    await redisUpdate(`${Roulette.redisSuffix}:${this.id}`, this)
  }

  async playRoulette(): Promise<void> {
    this.result = generateResult()
    this.state = 'roulette closed'
    await redisUpdate(`${Roulette.redisSuffix}:${this.id}`, { ...this, result: JSON.stringify(this.result) })
  }

}

export default Roulette