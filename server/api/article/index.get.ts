import { ArticleSchema } from '~/server/models/article.schema';
import { IArticle } from '~/server/types';
import { render } from '~/composables/markdown-render';

export default defineEventHandler(async event => {
	try {
		const article: IArticle = await ArticleSchema.find({ status: 'PUBLISHED' }, { content: 0 });
		const { content } = await render(article.content);
		article.html = content;

		return article;
	} catch (error) {
		return error;
	}
});
