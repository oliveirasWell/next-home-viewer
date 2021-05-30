import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  extend type Query {
    weather(lon: Float, lat: Float): OpenWeatherReading!
    home: Home!
  }
  type Home {
    temperature: Int!
    humidity: Int!
  }
  type OpenWeatherReading {
    name: String!
    main: Weather!
  }
  type Weather {
    temp: Float!
    temp_max: Float!
    temp_min: Float!
    feels_like: Float!
  }
`
