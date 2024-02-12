export default defineEventHandler(async (event) => {
  console.warn(`request: ${event.path}`)
  const body = await readBody(event)
  try {
    return await new UserSchema(body).save()
  }
  catch (error) {
    return error
  }
})
