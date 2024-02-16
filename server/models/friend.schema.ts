import { defineMongooseModel } from '#nuxt/mongoose'

export const FriendSchema = defineMongooseModel({
  name: 'Friend',
  schema: {
    title: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    screenShot: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  options: {
    timestamps: true,
  },
})
