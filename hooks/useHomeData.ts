import { ApolloError, gql, useQuery } from '@apollo/client'
import { PlantI } from '../typings/Plant'

const QUERY = gql`
  query Home {
    home {
      temperature
      humidity
      date
      plant {
        humidity
        date
      }
    }
  }
`

interface UseHomeDataI {
  date: Date | undefined
  localHumid: number | undefined
  localTemp: number | undefined
  plants: PlantI[]
  loading: boolean
  error: ApolloError | undefined
}

const convertToDate = (data: number): Date => {
  const d = new Date(0) // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(data)
  return d
}

export const useHomeData = (): UseHomeDataI => {
  const { data, loading, error } = useQuery(QUERY)

  const data1 = data?.home?.plant?.date
  const plant = { ...data?.home?.plant, date: convertToDate(data1) }
  const plants: PlantI[] = [plant]

  return {
    localTemp: data?.home?.temperature,
    localHumid: data?.home?.humidity,
    date: convertToDate(data?.home?.date),
    plants,
    loading,
    error,
  }
}
