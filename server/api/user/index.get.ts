import { UserSchema } from '~/server/models/user.schema'

export default defineEventHandler(async (event) => {
  console.warn(`request: ${event.path}`)
  try {
    return await UserSchema.find({})
  }
  catch (error) {
    return error
  }
})
