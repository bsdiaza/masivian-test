interface IRoulette {
  id: string
  state: String
  result?: IRouletteResult
}

interface IRouletteResult {
  color: string
  number?: Number
}