import { FC } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { GlobalStyle } from '../components/GlobalStyle'
import { Clock } from '../components/Clock'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useGeolocation } from '../hooks/useGeolocation'
import { useOpenWeather } from '../hooks/useOpenWeather'

const queryClient = new QueryClient()

const Container = styled.div`
  background-color: #2d2f33;
`

const Card = styled.div`
  background-color: #2d2f38;
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  min-width: 400px;
`

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 800px;
  margin-top: 3rem;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
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

const kelvinToCelsius = (temp: number): number => temp - 273.15
const kelvinToCelsiusString = (temp: number): string => `${kelvinToCelsius(temp).toFixed(2)}˚ C`

const Home: FC = () => {
  const { position } = useGeolocation()

  const lat = position?.coords?.latitude
  const lon = position?.coords?.longitude

  const localTemp = 30
  const localHumid = 15

  const { isLoading, data } = useOpenWeather(lat, lon)

  return (
    <>
      <Container>
        <Head>
          <title>Next Home Viewer</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Clock />
          <Grid>
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
              <CardH3>House</CardH3>
              <p>Local Temp: {localTemp}</p>
              <p>Local Humid: {localHumid}%</p>
            </Card>
            <Card>
              <p>Latitude: {position?.coords?.latitude}</p>
              <p>Longitude: {position?.coords?.longitude}</p>
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
    <Home />
  </QueryClientProvider>
)

export default HomeContainer
