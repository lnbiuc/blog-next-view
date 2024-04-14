import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY
    if (!secretKey)
      return event.respondWith(new Response('jwt secretKey is required', { status: 500 }))

    const body = await readBody(event)
    const nickname = body.nickname
    const password = body.password
    const res = await UserSchema.findOne({ nickname, password }, '_id, nickname')
    if (res) {
      const token = jwt.sign({ _id: res._id, nickname: res.nickname }, secretKey as string)
      return { code: 200, msg: 'login success', token, res }
    }
    return { code: 400, msg: 'login failed' }
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
