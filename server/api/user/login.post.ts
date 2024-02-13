export default defineEventHandler(async (event) => {
  console.warn(`start request: ${event.path}`)
  const startTime = Date.now()
  try {
    const body = await readBody(event)
    const nickname = body.nickname
    const password = body.password
    const res = await UserSchema.findOne({ nickname, password }, '_id, nickname')
    const endTime = Date.now()
    const elapsedTime = endTime - startTime
    console.warn(`request: ${event.path} takes ${elapsedTime} ms`)
    return res
  }
  catch (error) {
    return error
  }
})
