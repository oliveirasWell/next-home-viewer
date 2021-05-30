/* eslint-disable @typescript-eslint/no-unused-vars */
import { GeolocationCords } from '../../../../../typings/GeolocationCords'
import OpenWeatherService from './OpenWeatherService'
import { TemperatureLecture } from '../../../../../typings/TemperatureLecture'

export const OpenWeatherResolver = {
  weather: async (
    _: unknown,
    { lon, lat }: GeolocationCords,
    __: unknown
  ): Promise<TemperatureLecture> => new OpenWeatherService().weather({ lon, lat }),
}
