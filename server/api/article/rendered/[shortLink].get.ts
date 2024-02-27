import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	try {
		const shortLink = event.context.params?.shortLink;

		return await ArticleSchema.findOne({ shortLink }, { html: 1 });
	} catch (error) {
		return error;
	}
});
