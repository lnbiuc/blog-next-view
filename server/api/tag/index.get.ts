import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	console.warn(`start request: ${event.path}`);
	const startTime = Date.now();
	try {
		const res = await ArticleSchema.find({ status: 'PUBLISHED' }, { tags: 1 });
		const endTime = Date.now();
		const elapsedTime = endTime - startTime;
		console.warn(`request: ${event.path} takes ${elapsedTime} ms`);
		return res;
	} catch (error) {
		return error;
	}
});
