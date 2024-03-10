import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	try {
		return await ArticleSchema.find({ status: 'PUBLISHED' }, { html: 0 });
	} catch (error) {
		return new Response(error as string, { status: 500 });
	}
});
