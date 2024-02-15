import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	console.warn(`start request: ${event.path}`);
	const startTime = Date.now();
	try {
		const body = await readBody(event);
		if (!body._id || body._id === '') return { error: 'missing _id' };
		const res = await ArticleSchema.findByIdAndUpdate(body._id, body, { new: true });
		const endTime = Date.now();
		const elapsedTime = endTime - startTime;
		console.warn(`request: ${event.path} takes ${elapsedTime} ms`);
		return res;
	} catch (error) {
		return error;
	}
});
