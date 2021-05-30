import { GeolocationCords } from '../../../../../typings/GeolocationCords'
import { getOpenWeatherURL } from '../../../../../shared/utils'
import { TemperatureLecture } from '../../../../../typings/TemperatureLecture'

class OpenWeatherService {
  async weather({ lon, lat }: GeolocationCords): Promise<TemperatureLecture> {
    return await fetch(getOpenWeatherURL(lat, lon)).then((res) => res.json())
  }
}

export default OpenWeatherService
