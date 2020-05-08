import redis, { RedisClient } from 'redis'
import { promisify } from 'util'
import Model from './classes/model.class'

let redisCli: RedisClient = redis.createClient()
const redisHGetAll = promisify(redisCli.hgetall).bind(redisCli)
const redisGet = promisify(redisCli.get).bind(redisCli)
const redisKeys = promisify(redisCli.keys).bind(redisCli)
const redisSet = promisify(redisCli.set).bind(redisCli)
const redisWrite = (key: string, object: Model) => { redisCli.hmset(key, Object.assign(object)) }

export async function redisFindOne(key: string): Promise<any> {
  return await redisHGetAll(key)
}

export async function redisFind(suffix: string): Promise<Array<any>> {
  const keys = await redisKeys(`${suffix}:*`)
  return await Promise.all(keys.map(async key => await redisFindOne(key)))
}

export async function redisRegister(key: string, object: Model) {
  return redisWrite(key, Object.assign(object))
}

export async function redisUpdate(key: string, object: Model) {
  let registry = await redisFindOne(key)
  registry = { ...registry, ...object }
  redisWrite(key, Object.assign(object))
  return registry
}

export async function generateId(suffix: string): Promise<any> {
  const key = `metadata:${suffix}:incremental`
  let id = await redisGet(key)
  if (id == 'NaN')
    id = '0'
  await redisSet(key, `${parseInt(id) + 1}`)
  return parseInt(id)
}
