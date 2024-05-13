import process from 'node:process'
import axios from 'axios'

export default defineEventHandler(async () => {
  try {
    if (
      !process.env.UMAMI_ADDRESS
      || !process.env.UMAMI_WEBSITE_ID
      || !process.env.UMAMI_AUTH_TOKEN
    )
      return new Response('func disabled, umami env not init', { status: 500 })

    const startDay = new Date('2024-01-01 00:00:00')

    const { data } = await axios.get(
        `${process.env.UMAMI_ADDRESS}/api/websites/${process.env.UMAMI_WEBSITE_ID}/pageviews`,
        {
          headers: { Authorization: `Beare ${process.env.UMAMI_AUTH_TOKEN}` },
          params: {
            startAt: startDay.getTime(),
            endAt: new Date().getTime(),
            unit: 'year',
            timezone: 'Asia/Shanghai',
            url: '/',
          },
        },
    )
    if (data)
      return data
    else
      return new Response('error when get active user', { status: 500 })
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
