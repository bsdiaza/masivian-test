import Roulette from "../data/classes/roulette.class"

export async function searchRoulette(id: string): Promise<Roulette> {
  const roulette = await Roulette.findByid(id)
  if(!roulette)
    throw { status: 404, message: 'Roulette not found' }
  return new Roulette(roulette.id, roulette.state)
}

export function processBetOption(option: string): IRouletteResult {
  let color, number
  option = option.trim()

  if(isInteger(option)) {
    number = parseInt(option)
    validateNumber(number)
    color = getColor(number)
  } else {
    validateColor(option)
    color = option
  }

  return { color, number }
}

export function generateResult(){
  const number = Math.ceil(Math.random() * 36)
  let color
  if(number%2 == 1)
    color = 'red'
  else
    color = 'black'
  return { number, color }
}

export function mapResult(roulette: Roulette) {
  if(roulette && roulette.result)
    roulette.result = JSON.parse(roulette.result as any)
  return roulette
}

function getColor(number: number): string {
  let color
  if(number%2 == 1)
    color = 'red'
  else
    color = 'black'
  return color
}

function validateNumber(number: number): void {
  if(number < 1 && number > 36)
    throw { status: 400, message: 'invalid number option' }
}

function validateColor(color: string): void {
  if(color !== 'black' && color !== 'red')
    throw { status: 400, message: 'invalid color option' }
}

function isInteger(value: string): boolean {
  return /^\d+$/.test(value);
}