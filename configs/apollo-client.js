import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GRAPHQL_API_PATH } from '../shared/utils'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_ENDPOINT_URL + GRAPHQL_API_PATH,
  cache: new InMemoryCache(),
})

export default client
