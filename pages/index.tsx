import { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { GlobalStyle } from '../components/GlobalStyle'
import { Clock } from '../components/Clock'
import { GoogleFonts } from 'next-google-fonts'

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

const Home: FC = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<
    { name: string; main: { temp: number; temp_max: number; temp_min: number } } | undefined
  >(undefined)

  useEffect(() => {
    const fetchResult = async (): Promise<void> => {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=3449319&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((response) => response.json())

      setData(result)
    }

    setLoading(true)
    fetchResult().finally(() => setLoading(false))
  }, [])

  return (
    <>
      <GlobalStyle />
      <Container className="container">
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
        <Head>
          <title>Next Home Viewer</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Clock />
          {
            <div className="grid">
              <Card className="card">
                {loading && <>Loading</>}
                {!loading && !!data && (
                  <>
                    <h3>{data?.name}</h3>
                    <h4>{kelvinToCelsiusString(data?.main?.temp)}</h4>
                    <h4>max {kelvinToCelsiusString(data?.main?.temp_max)}</h4>
                    <h4>min {kelvinToCelsiusString(data?.main?.temp_min)}</h4>
                    <p>
                      Enjoy our day (or not){' '}
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

export default Home
