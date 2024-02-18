import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	try {
		const category = event.context.params?.category;
		return await ArticleSchema.find({ category }, {});
	} catch (error) {
		return error;
	}
});
