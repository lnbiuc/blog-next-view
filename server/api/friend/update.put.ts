import { FriendSchema } from '~/server/models/friend.schema';

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event);
		if (!body._id || body._id === '') return { error: 'missing _id' };
		return await FriendSchema.findByIdAndUpdate(body._id, body, { new: true });
	} catch (error) {
		return new Response(error as string, { status: 500 });
	}
});
