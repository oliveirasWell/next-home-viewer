import { useQuery, gql, ApolloError } from '@apollo/client'
import { Plant } from '../typings/Plant'

const QUERY = gql`
  query Home {
    home {
      temperature
      humidity
      date
      plant {
        humidity
      }
    }
  }
`

interface UseHomeDataI {
  date: Date | undefined
  localHumid: number | undefined
  localTemp: number | undefined
  plant: Plant
  loading: boolean
  error: ApolloError | undefined
}

export const useHomeData = (): UseHomeDataI => {
  const { data, loading, error } = useQuery(QUERY)

  const utcSeconds = data?.home?.date
  const d = new Date(0) // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds)

  return {
    localTemp: data?.home?.temperature,
    localHumid: data?.home?.humidity,
    date: d,
    plant: data?.home?.plant,
    loading,
    error,
  }
}
