import { TELEGRAM_API_URL } from '../../../../shared/utils'

const sendMessage = async (text: string): Promise<boolean> => {
  const body = `{"chat_id": ${process.env.CHAT_ID}, "text": "${text}", "disable_notification": false}`
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let json
  try {
    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: myHeaders,
      body,
    })
    json = await response.json()
  } catch (error) {
    console.error(error)
  }

  return json?.ok
}

export const TelegramResolver = {
  // eslint-disable-next-line
  async sendMessage(parent: unknown, args: { text: string }, context: unknown): Promise<boolean> {
    const response = await sendMessage(args.text)

    return Boolean(response)
  },
}
