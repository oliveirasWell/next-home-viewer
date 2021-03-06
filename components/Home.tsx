import styled from 'styled-components'
import { FC } from 'react'
import { convertToDate, useHomeData } from '../hooks/useHomeData'
import { useOpenWeatherGraphql } from '../hooks/useOpenWeatherGraphql'
import Head from 'next/head'
import { kelvinToCelsiusString, randomIntFromInterval } from '../shared/utils'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Clock } from './Clock'

const textColor = '#2d2f33'
const accentColor = 'rgba(255, 89, 89, 0.95)'
const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

interface CardProps {
  textCentered?: boolean
  backgroundImage?: string
  backgroundColor?: string
  color?: string
}

const Container = styled.div``
const Card = styled.div<CardProps>`
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: ${({ color }) => (!color ? 'lightgrey' : color)};
  text-decoration: none;
  transition: color 0.15s ease, border-color 0.15s ease;
  ${({ textCentered = false }) => textCentered && 'text-align: center;'}
  ${({ backgroundColor = false }) => backgroundColor && `background-color: ${backgroundColor};`}
  position: relative;
  z-index: 1;

  @media (min-width: 1000px) {
    min-width: 300px;
  }
`

const CardFull = styled(Card)`
  flex: 1;
  height: 300px;
  padding: 8px;
`

const GithubIcon = styled(({ className }) => (
  <FontAwesomeIcon icon={faGithub} size="xs" className={className} />
))`
  max-width: 50px;
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
    background-size: cover;
    background-color: rgba(171, 167, 167, 0.1);
    background-blend-mode: lighten;
  `}
`
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`

const CardH3 = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  display: inline;
`

const CardColored = styled.div<{ tempColor?: string }>`
  background-color: ${({ tempColor }) => tempColor || accentColor};
  padding: 16px;
`

const CardLightColored = styled.div<{ tempColor?: string }>`
  padding: 16px;
  background-color: rgba(171, 167, 167, 0.7);
  background-blend-mode: lighten;
`

const CardH1 = styled.h1`
  margin: 0 0 1rem 0;
  font-size: 3rem;
  display: inline;
`
const CardP = styled.p`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
`

const Psmall = styled.p`
  font-size: 0.8rem;
  font-weight: 800;
  margin-top: 8px;
  margin-bottom: 8px;
`

const Hr = styled.hr<{ tempColor?: string }>`
  border: 1px solid ${({ tempColor }) => tempColor || accentColor};
  color: ${({ tempColor }) => tempColor || accentColor};
  background-color: ${({ tempColor }) => tempColor || accentColor};
`

const tempEmoji = ({ temp: tempString = 0 }): string => {
  const temp = Number(tempString)

  const getEmoji = (): string => {
    if (temp && temp < 0) {
      return '????????????'
    }

    if (temp && temp <= 10) {
      return '??????????'
    }

    if (temp && temp <= 20) {
      return '????'
    }

    if (temp && temp <= 30) {
      return '????'
    }

    if (temp && temp > 30) {
      return '????'
    }

    return ''
  }

  return getEmoji()
}

const Loading: FC = () => <CardColored>Loading...</CardColored>

type CustomizedAxisTickProps = {
  x: string
  y: string
  payload: { value: number }
}

const CustomizedAxisTick = ({ x, y, payload }: CustomizedAxisTickProps) => {
  const toLocaleString = convertToDate(payload.value)?.toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: clientTimeZone,
  })

  console.log(toLocaleString)

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
        {toLocaleString}
      </text>
    </g>
  )
}

export const Home: FC = () => {
  const {
    localHumid,
    localTemp,
    date,
    plants,
    loading: homeLoading,
    temperatureHistory,
  } = useHomeData()
  const { isLoading, data } = useOpenWeatherGraphql(-22.000306899999998, -47.8922185)

  const sancaImageNumber = randomIntFromInterval(1, 5)
  const sancaImageNumberTime = randomIntFromInterval(1, 5)
  const sancaImageNumberGithub = randomIntFromInterval(1, 5)

  return (
    <>
      <Container>
        <Head>
          <title>Next Home Viewer</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Grid>
            <Card color={textColor}>
              {homeLoading && <Loading />}
              {!homeLoading && (
                <>
                  <Image backgroundImage="./assets/desktop.jpg" />
                  <CardColored>
                    <CardH1>{localTemp}??</CardH1>
                    <CardH3>{localHumid}% </CardH3>
                  </CardColored>
                  <Hr />
                  {Boolean(date) && (
                    <CardLightColored>
                      <Psmall>
                        {' '}
                        {tempEmoji({ temp: localTemp })}{' '}
                        {date?.toLocaleString('pt-BR', { timeZone: clientTimeZone })}{' '}
                      </Psmall>
                    </CardLightColored>
                  )}
                </>
              )}
            </Card>

            {(plants || []).map((plant, i) => (
              <Card key={i} color={textColor}>
                {homeLoading && <Loading />}
                {!homeLoading && (
                  <>
                    <Image backgroundImage={`./assets/plant_${i + 1}.jpg`} />
                    <CardColored>
                      <CardH1>{plant.humidity}</CardH1>
                      <CardH3> Humid</CardH3>
                    </CardColored>
                    <Hr />
                    <CardLightColored>
                      <Psmall>Plant {i + 1}</Psmall>
                      {Boolean(plant?.date) && (
                        <Psmall>
                          {plant?.date?.toLocaleString('pt-BR', { timeZone: clientTimeZone })}
                        </Psmall>
                      )}
                    </CardLightColored>
                  </>
                )}
              </Card>
            ))}

            {temperatureHistory && (
              <CardFull backgroundColor="black">
                <CardH3>Temperature History</CardH3>
                {isLoading && <Loading />}
                {!isLoading && !!data && (
                  <ResponsiveContainer width="100%" height="90%">
                    <LineChart width={900} height={300} data={temperatureHistory}>
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke={accentColor}
                        strokeWidth={2}
                      />
                      <XAxis dataKey="date" tick={CustomizedAxisTick} />
                      <YAxis domain={['dataMin - 2', 'dataMax + 2']} dataKey="temperature" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardFull>
            )}
          </Grid>
          <Grid>
            <Card color={textColor}>
              <Image backgroundImage={`./assets/sanca${sancaImageNumber}.jpg`} />
              {isLoading && <Loading />}
              {!isLoading && !!data && (
                <>
                  <CardColored>
                    <CardH3>{data?.name}</CardH3>
                  </CardColored>
                  <Hr />

                  <CardLightColored>
                    <h4>{kelvinToCelsiusString(data?.main?.temp)}</h4>
                    <h4>feels like {kelvinToCelsiusString(data?.main?.feels_like)}</h4>
                    <h4>max {kelvinToCelsiusString(data?.main?.temp_max)}</h4>
                    <h4>min {kelvinToCelsiusString(data?.main?.temp_min)}</h4>
                  </CardLightColored>
                </>
              )}
            </Card>
            <Card textCentered color={textColor}>
              <Image backgroundImage={`./assets/sanca${sancaImageNumberTime}.jpg`} />
              <CardLightColored>
                <Clock />
              </CardLightColored>
              <Hr />
              <CardColored>
                <CardP>
                  Enjoy your day <br />
                  (or not){' '}
                  <span role="img" aria-label="emoji-sun-glasses">
                    ????
                  </span>
                </CardP>
              </CardColored>
            </Card>
            <Card textCentered color={textColor}>
              <Image backgroundImage={`./assets/sanca${sancaImageNumberGithub}.jpg`} />
              <CardColored>
                <a
                  href="https://github.com/oliveiraswell/next-home-viewer"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon />
                </a>
              </CardColored>
            </Card>
          </Grid>
        </main>
      </Container>
    </>
  )
}
