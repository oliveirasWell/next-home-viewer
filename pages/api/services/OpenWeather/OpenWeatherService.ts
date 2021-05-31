import { GeolocationCords } from '../../../../typings/GeolocationCords'
import { TemperatureLecture } from '../../../../typings/TemperatureLecture'
import { getOpenWeatherURL } from '../../../../shared/utils'

class OpenWeatherService {
  async weather({ lon, lat }: GeolocationCords): Promise<TemperatureLecture> {
    return await fetch(getOpenWeatherURL(lat, lon)).then((res) => res.json())
  }
}

export default OpenWeatherService
