export const GRAPHQL_API_PATH = '/api/graphql'

export const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.BOT_KEY}/sendMessage`

export const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

export const getOpenWeatherURL = (lat: number | undefined, lon: number | undefined): string =>
  `${OPEN_WEATHER_API_URL}?${getOpenWeatherParams(lat, lon)}`

export const getOpenWeatherParams = (lat: number | undefined, lon: number | undefined): string =>
  `lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`

export const kelvinToCelsius = (temp: number): number => temp - 273.15

export const kelvinToCelsiusString = (temp: number): string =>
  `${kelvinToCelsius(temp).toFixed(2)}˚ C`

export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
