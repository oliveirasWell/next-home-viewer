/* eslint-disable @typescript-eslint/no-unused-vars */
import { firebaseDatabase } from '../../../../configs/firebase-config'
import { Plant } from '../../../../typings/Plant'

interface HomeI {
  temperature: number
  humidity: number
  date: number
  plant: Plant
}

const ID = '1'

const TIMEZONE_OFFSET = 4 * 60 * 60

export const HomeResolver = {
  async home(parent: unknown, args: unknown, context: unknown): Promise<HomeI> {
    const snapshot = await firebaseDatabase.ref().child('home').child(ID).get()

    let temperature, humidity, data, plant_1
    try {
      ;({ temperature, humidity, data, plant_1 } = snapshot.val())
    } catch (error) {
      console.error(error)
    }

    return {
      temperature: temperature as number,
      humidity: humidity as number,
      date: (Number(data) + TIMEZONE_OFFSET) as number,
      plant: { humidity: plant_1.humidity, date: Number(plant_1.date) + TIMEZONE_OFFSET } as Plant,
    }
  },
}
