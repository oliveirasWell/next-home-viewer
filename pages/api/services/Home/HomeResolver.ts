/* eslint-disable @typescript-eslint/no-unused-vars */
import { firebaseDatabase } from '../../../../configs/firebase-config'

interface HomeI {
  temperature: number
  humidity: number
}

const ID = '1'

export const HomeResolver = {
  async home(parent: unknown, args: unknown, context: unknown): Promise<HomeI> {
    const snapshot = await firebaseDatabase.ref().child('home').child(ID).get()

    let temperature, humidity
    try {
      ;({ temperature, humidity } = snapshot.val())
    } catch (error) {
      console.error(error)
    }
    return { temperature, humidity }
  },
}
