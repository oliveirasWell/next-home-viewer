import { ApolloError, gql, useQuery } from '@apollo/client'
import { PlantI } from '../typings/Plant'
import { HomeI } from '../typings/HomeI'

const QUERY = gql`
  query Home {
    home {
      temperature
      humidity
      date
      plants {
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
  plants: PlantI[] | undefined
  loading: boolean
  error: ApolloError | undefined
}

const convertToDate = (data: number): Date => {
  const d = new Date(0) // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(data)
  return d
}

interface HomeQuery {
  home: HomeI
}

export const useHomeData = (): UseHomeDataI => {
  const { data, loading, error } = useQuery<HomeQuery>(QUERY)

  const plants = data?.home?.plants?.map((plant) => ({
    ...plant,
    date: convertToDate(plant?.date || -1),
  }))

  return {
    localTemp: data?.home?.temperature,
    localHumid: data?.home?.humidity,
    date: convertToDate(data?.home?.date || -1),
    plants,
    loading,
    error,
  }
}
