import { useQuery, gql, ApolloError } from '@apollo/client'

const QUERY = gql`
  query Home {
    home {
      temperature
      humidity
    }
  }
`

interface UseHomeDataI {
  localHumid: number | undefined
  localTemp: number | undefined
  loading: boolean
  error: ApolloError | undefined
}

export const useHomeData = (): UseHomeDataI => {
  const { data, loading, error } = useQuery(QUERY)

  return {
    localTemp: data?.home?.temperature,
    localHumid: data?.home?.humidity,
    loading,
    error,
  }
}
