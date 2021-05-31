import { UseOpenWeatherI } from '../typings/UseOpenWeatherI'
import { gql, useQuery } from '@apollo/client'

const QUERY = gql`
  query Weather($lat: Float, $lon: Float) {
    weather(lat: $lat, lon: $lon) {
      name
      main {
        temp
        temp_max
        temp_min
        feels_like
      }
    }
  }
`

export const useOpenWeatherGraphql = (
  lat: number | undefined,
  lon: number | undefined
): UseOpenWeatherI => {
  const { data, loading: isLoading } = useQuery(QUERY, {
    variables: { lat, lon },
    skip: !(lat && lon),
  })

  return { isLoading, data: data?.weather }
}
