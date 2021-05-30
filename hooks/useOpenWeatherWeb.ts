import { useQuery } from 'react-query'
import { getOpenWeatherURL } from '../shared/utils'
import { TemperatureLecture } from '../typings/TemperatureLecture'
import { UseOpenWeatherI } from '../typings/UseOpenWeatherI'

export const useOpenWeatherWeb = (
  lat: number | undefined,
  lon: number | undefined
): UseOpenWeatherI => {
  const { isLoading, data } = useQuery<TemperatureLecture>(
    'weatherData',
    () => fetch(getOpenWeatherURL(lat, lon)).then((res) => res.json()),
    {
      refetchInterval: 60000 * 5, // 5min
      enabled: Boolean(lat && lon),
    }
  )

  return { isLoading, data }
}
