import { ArticleSchema } from '~/server/models/article.schema';
import { render } from '~/composables/markdown-render';

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event);
		if (!body._id || body._id === '') return { error: 'missing _id' };
		const { content } = await render(body.content);
		body.html = content;

		return await ArticleSchema.findByIdAndUpdate(body._id, body, { new: true });
	} catch (error) {
		return error;
	}
});
