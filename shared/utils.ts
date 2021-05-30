export const GRAPHQL_API_PATH = '/api/graphql'

export const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

export const getOpenWeatherURL = (lat: number | undefined, lon: number | undefined): string =>
  `${OPEN_WEATHER_API_URL}?${getOpenWeatherParams(lat, lon)}`

export const getOpenWeatherParams = (lat: number | undefined, lon: number | undefined): string =>
  `lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
