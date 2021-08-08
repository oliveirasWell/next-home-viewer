/* eslint-disable @typescript-eslint/no-unused-vars */
import { firebaseDatabase } from '../../../../configs/firebase-config'
import { Plant } from '../../../../typings/Plant'
import { HomeI } from '../../../../typings/HomeI'

const ID = '1'

const TIMEZONE_OFFSET = 4 * 60 * 60

const plant = (plant_1: Plant): Plant =>
  ({
    humidity: plant_1.humidity,
    date: Number(plant_1.date) + TIMEZONE_OFFSET,
  } as Plant)

export const HomeResolver = {
  async home(parent: unknown, args: unknown, context: unknown): Promise<HomeI> {
    const temperature = (await firebaseDatabase.ref().child('home/1/temperature').get()).val()
    const humidity = (await firebaseDatabase.ref().child('home/1/humidity').get()).val()
    const data = (await firebaseDatabase.ref().child('home/1/data').get()).val()
    const plant_1 = (await firebaseDatabase.ref().child('home/1/plant_1').get()).val()
    const plant_2 = (await firebaseDatabase.ref().child('home/1/plant_2').get()).val()

    const temperature_history = (
      await firebaseDatabase.ref().child('home/1/temperature_history').limitToLast(40).get()
    ).val()

    const plants = [plant(plant_1), plant(plant_2)]

    const temperatureHistory = Object.keys(temperature_history).map((key) => {
      const history_entry = temperature_history[key]

      return {
        temperature: history_entry.temperature as number,
        date: (Number(history_entry.data) + TIMEZONE_OFFSET) as number,
      }
    })

    return {
      temperature: temperature as number,
      humidity: humidity as number,
      date: (Number(data) + TIMEZONE_OFFSET) as number,
      plants: plants,
      temperatureHistory,
    }
  },
}
