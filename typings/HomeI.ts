import { Plant } from './Plant'

export interface HomeI {
  temperature: number
  humidity: number
  date: number
  plants: Plant[]
  temperatureHistory: { temperature: number; date: number }[]
}
