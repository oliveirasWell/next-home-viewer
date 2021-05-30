import { OpenWeatherResolver } from './resolvers/resolvers/OpenWeather/OpenWeatherResolver'
import { ApolloServer } from 'apollo-server-micro'
import { GRAPHQL_API_PATH } from '../../shared/utils'
import { HomeResolver } from './resolvers/resolvers/Home/HomeResolver'
import { typeDefs } from './typeDefs'

const resolvers = {
  Query: {
    ...HomeResolver,
    ...OpenWeatherResolver,
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: GRAPHQL_API_PATH })
