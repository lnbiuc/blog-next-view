import { FriendSchema } from '~/server/models/friend.schema';

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event);
		return await new FriendSchema(body).save();
	} catch (error) {
		return new Response(error as string, { status: 500 });
	}
});
