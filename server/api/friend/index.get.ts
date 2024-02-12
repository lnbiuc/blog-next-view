import { FriendSchema } from '~/server/models/friend.schema'

export default defineEventHandler(async (event) => {
  console.warn(`request: ${event.path}`)
  try {
    return await FriendSchema.find({})
  }
  catch (error) {
    return error
  }
})
