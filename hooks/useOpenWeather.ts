import { useQuery } from 'react-query'

interface TemperatureLecture {
  name: string
  main: { temp: number; temp_max: number; temp_min: number; feels_like: number }
}

interface UseOpenWeatherI {
  isLoading: boolean
  data: TemperatureLecture | undefined
}

export const useOpenWeather = (
  lat: number | undefined,
  lon: number | undefined
): UseOpenWeatherI => {
  const { isLoading, data } = useQuery<TemperatureLecture>(
    'weatherData',
    () =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()),
    {
      refetchInterval: 60000 * 5, // 5min
      enabled: Boolean(lat && lon),
    }
  )

  return { isLoading, data }
}
