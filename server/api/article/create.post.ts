import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event);
		return await new ArticleSchema(body).save();
	} catch (error) {
		return new Response(error as string, { status: 500 });
	}
});
