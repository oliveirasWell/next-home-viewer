/* eslint-disable @typescript-eslint/no-unused-vars */

interface HomeI {
  temperature: number
  humidity: number
}

export const HomeResolver = {
  home(parent: unknown, args: unknown, context: unknown): HomeI {
    return { temperature: 20, humidity: 15 }
  },
}
