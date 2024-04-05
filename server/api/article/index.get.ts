import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	try {
		const article = await ArticleSchema.find({ status: 'PUBLISHED' }, { content: 0 });
		if (article) {
			return article;
		} else {
			return { title: '404 Not Found' };
		}
	} catch (error) {
		return new Response(error as string, { status: 500 });
	}
});
