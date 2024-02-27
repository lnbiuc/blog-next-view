import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event);
		if (!body._id || body._id === '') return { error: 'missing _id' };
		return await ArticleSchema.findByIdAndUpdate(body._id, body, { new: true });
	} catch (error) {
		return error;
	}
});
