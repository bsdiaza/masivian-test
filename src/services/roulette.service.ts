import Roulette from "../data/classes/roulette.class"

export async function searchRoulete(id: string): Promise<Roulette> {
  const roulette = await Roulette.findByid(id)
  if(!roulette)
    throw { status: 404, message: 'Roulette not found' }
  return new Roulette(roulette.id, roulette.state)
}
