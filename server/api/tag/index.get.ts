import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	try {
		return await ArticleSchema.find({ status: 'PUBLISHED' }, { tags: 1 });
	} catch (error) {
		return error;
	}
});
