import { useEffect, useState } from 'react'

interface UseGeolocationI {
  position: GeolocationPosition | undefined
  error: GeolocationPositionError | undefined
}

export const useGeolocation = (options?: PositionOptions | undefined): UseGeolocationI => {
  const [position, setPosition] = useState<GeolocationPosition | undefined>()
  const [error, setError] = useState<GeolocationPositionError | undefined>()

  useEffect(() => {
    let canceled = false

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!canceled) {
          setPosition(position)
        }
      },
      (error) => {
        if (!canceled) {
          setError(error)
        }
      },
      options
    )

    return () => {
      canceled = true
    }
  }, [options])

  return { position, error }
}
