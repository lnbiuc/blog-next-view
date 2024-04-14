import { FriendSchema } from '~/server/models/friend.schema'

export default defineEventHandler(async () => {
  try {
    return await FriendSchema.find()
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
