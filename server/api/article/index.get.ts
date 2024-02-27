import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	try {
		return await ArticleSchema.find({ status: 'PUBLISHED' }, { content: 0, html: 0 });
	} catch (error) {
		return error;
	}
});
