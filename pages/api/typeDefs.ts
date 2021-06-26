import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Query {
    _empty: String
    sendMessage(text: String): Boolean
    weather(lon: Float, lat: Float): OpenWeatherReading!
    home: Home!
  }
  type Mutation {
    _empty: String
  }
  type Home {
    temperature: Int!
    humidity: Int!
    date: Int!
    plants: [Plant]
  }
  type OpenWeatherReading {
    name: String!
    main: Weather!
  }
  type Plant {
    humidity: Int!
    date: Int!
  }
  type Weather {
    temp: Float!
    temp_max: Float!
    temp_min: Float!
    feels_like: Float!
  }
`
