import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	try {
		const shortLink = event.context.params?.shortLink;

		return await ArticleSchema.deleteOne({ shortLink });
	} catch (error) {
		return new Response(error as string, { status: 500 });
	}
});
