export default defineEventHandler(async (event) => {
  console.warn(`start request: ${event.path}`)
  const startTime = Date.now()
  const body = await readBody(event)
  try {
    const res = await new UserSchema(body).save()
    const endTime = Date.now()
    const elapsedTime = endTime - startTime
    console.warn(`request: ${event.path} takes ${elapsedTime} ms`)
    return res
  }
  catch (error) {
    return error
  }
})
