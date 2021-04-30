import { FC } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { GlobalStyle } from '../components/GlobalStyle'
import { Clock } from '../components/Clock'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

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
  min-width: 300px;
`

const kelvinToCelsius = (temp: number): number => temp - 273.15
const kelvinToCelsiusString = (temp: number): string => `${kelvinToCelsius(temp).toFixed(2)}˚ C`

interface TemperatureLecture {
  name: string
  main: { temp: number; temp_max: number; temp_min: number; feels_like: number }
}

const Home: FC = () => {
  const { isLoading, data } = useQuery<TemperatureLecture>(
    'weatherData',
    () =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=3449319&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json()),
    {
      refetchInterval: 60000 * 5, // 5min
    }
  )

  return (
    <>
      <Container className="container">
        <Head>
          <title>Next Home Viewer</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Clock />
          {
            <div className="grid">
              <Card className="card">
                {isLoading && <>Loading...</>}
                {!isLoading && !!data && (
                  <>
                    <h3>{data?.name}</h3>
                    <h4>{kelvinToCelsiusString(data?.main?.temp)}</h4>
                    <h4>feels like {kelvinToCelsiusString(data?.main?.feels_like)}</h4>
                    <h4>max {kelvinToCelsiusString(data?.main?.temp_max)}</h4>
                    <h4>min {kelvinToCelsiusString(data?.main?.temp_min)}</h4>
                    <p>
                      Enjoy your day (or not){' '}
                      <span role="img" aria-label="emoji-sun-glasses">
                        😎
                      </span>
                    </p>
                  </>
                )}
              </Card>
            </div>
          }
        </main>

        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
          </a>
        </footer>
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
