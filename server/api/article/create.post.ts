import { ArticleSchema } from '~/server/models/article.schema';
import { render } from '~/composables/markdown-render';

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event);
		const { content } = await render(body.content);
		body.html = content;
		return await new ArticleSchema(body).save();
	} catch (error) {
		return error;
	}
});
