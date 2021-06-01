import { ApolloServer } from 'apollo-server-micro'
import { GRAPHQL_API_PATH } from '../../shared/utils'
import { typeDefs } from './typeDefs'
import { HomeResolver } from './services/Home/HomeResolver'
import { OpenWeatherResolver } from './services/OpenWeather/OpenWeatherResolver'
import { TelegramResolver } from './services/Telegram/TelegramResolver'

const resolvers = {
  Query: {
    ...TelegramResolver,
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
