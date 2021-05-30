import { TemperatureLecture } from './TemperatureLecture'

export interface UseOpenWeatherI {
  isLoading: boolean
  data: TemperatureLecture | undefined
}
