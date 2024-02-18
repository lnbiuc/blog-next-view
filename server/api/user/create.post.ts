export default defineEventHandler(async event => {
	// const body = await readBody(event);
	try {
		// return await new UserSchema(body).save();
		return { code: 401, msg: 'reject' };
	} catch (error) {
		return error;
	}
});
