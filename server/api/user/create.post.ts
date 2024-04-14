export default defineEventHandler(async () => {
  // const body = await readBody(event);
  try {
    // return await new UserSchema(body).save();
    return { code: 401, msg: 'reject' }
  }
  catch (error) {
    return new Response(error as string, { status: 500 })
  }
})
