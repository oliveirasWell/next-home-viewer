import { FC } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { GlobalStyle } from '../components/GlobalStyle'
import { Clock } from '../components/Clock'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useGeolocation } from '../hooks/useGeolocation'

import { ApolloProvider } from '@apollo/client'
import client from '../configs/apollo-client'
import { useHomeData } from '../hooks/useHomeData'
import { useOpenWeatherGraphql } from '../hooks/useOpenWeatherGraphql'
import { kelvinToCelsius } from '../shared/utils'

const queryClient = new QueryClient()

const Container = styled.div`
  background-color: #2d2f33;
`

interface CardProps {
  textCentered?: boolean
  backgroundImage?: string
  color?: string
}

const Card = styled.div<CardProps>`
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: ${({ color }) => (!color ? 'lightgrey' : color)};
  text-decoration: none;
  border: 1px solid rgba(80, 77, 77, 0.6);
  transition: color 0.15s ease, border-color 0.15s ease;
  ${({ textCentered = false }) => textCentered && 'text-align: center;'}
  flex: 1;
  position: relative;
  z-index: 1;

  @media (min-width: 1000px) {
    min-width: 300px;
  }
`
const Image = styled.div<{ backgroundImage?: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -2;
  ${({ backgroundImage }) =>
    backgroundImage &&
    `
    background-image: url(${backgroundImage});
    // backdrop-filter: blur(5px);
    // -webkit-backdrop-filter: blur(5px);
    background-size: cover;
    background-color: rgba(171, 167, 167, 0.9);
    background-blend-mode: lighten;
  `}
`

const Grid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;

  max-width: 1000px;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`
const CardH3 = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`

const CardP = styled.p`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
`

const kelvinToCelsiusString = (temp: number): string => `${kelvinToCelsius(temp).toFixed(2)}˚ C`

const Home: FC = () => {
  const { position } = useGeolocation()

  const lat = position?.coords?.latitude
  const lon = position?.coords?.longitude

  const { localHumid, localTemp, date, plants } = useHomeData()
  const { isLoading, data } = useOpenWeatherGraphql(lat, lon)
  const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <>
      <Container>
        <Head>
          <title>Next Home Viewer</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Grid>
            <Card color="#2d2f33">
              <Image backgroundImage="./assets/desktop.jpg" />
              <CardH3>Home</CardH3>
              <p>Local Temp: {localTemp}</p>
              <p>Local Humid: {localHumid}%</p>
              {Boolean(date) && (
                <p>Last updated: {date?.toLocaleString('pt-BR', { timeZone: clientTimeZone })} </p>
              )}
            </Card>

            {(plants || []).map((plant, i) => (
              <Card key={i} color="#2d2f33">
                <Image backgroundImage={`./assets/plant_${i + 1}.jpg`} />
                <CardH3>Plant {i + 1}</CardH3>
                <p>Humid: {plant.humidity}</p>
                {Boolean(plant?.date) && (
                  <p>
                    Last updated:{' '}
                    {plant?.date?.toLocaleString('pt-BR', { timeZone: clientTimeZone })}
                  </p>
                )}
              </Card>
            ))}

            <Card>
              {isLoading && <>Loading...</>}
              {!isLoading && !!data && (
                <>
                  <CardH3>{data?.name}</CardH3>
                  <h4>{kelvinToCelsiusString(data?.main?.temp)}</h4>
                  <h4>feels like {kelvinToCelsiusString(data?.main?.feels_like)}</h4>
                  <h4>max {kelvinToCelsiusString(data?.main?.temp_max)}</h4>
                  <h4>min {kelvinToCelsiusString(data?.main?.temp_min)}</h4>
                  <CardP>
                    Enjoy your day (or not){' '}
                    <span role="img" aria-label="emoji-sun-glasses">
                      😎
                    </span>
                  </CardP>
                </>
              )}
            </Card>

            <Card>
              <p>Latitude: {position?.coords?.latitude}</p>
              <p>Longitude: {position?.coords?.longitude}</p>
            </Card>

            <Card textCentered>
              <Clock />
            </Card>
          </Grid>
        </main>
        <footer />
      </Container>
    </>
  )
}

const HomeContainer: FC = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  </QueryClientProvider>
)

export default HomeContainer
