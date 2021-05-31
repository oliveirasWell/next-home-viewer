/* eslint-disable @typescript-eslint/no-unused-vars */
import OpenWeatherService from './OpenWeatherService'
import { GeolocationCords } from '../../../../typings/GeolocationCords'
import { TemperatureLecture } from '../../../../typings/TemperatureLecture'

export const OpenWeatherResolver = {
  weather: async (
    _: unknown,
    { lon, lat }: GeolocationCords,
    __: unknown
  ): Promise<TemperatureLecture> => new OpenWeatherService().weather({ lon, lat }),
}
