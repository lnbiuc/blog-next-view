import { ArticleSchema } from '~/server/models/article.schema';
import type { IArticle } from '~/server/types';
import process from 'node:process';
import { render } from '~/utils/markdown-render';
import { cache } from '~/config/cache.config';

export default defineEventHandler(async event => {
	try {
		const shortLink = event.context.params?.shortLink as string;
		if (!shortLink) { return new Response('404 Not Found', { status: 404 }) };

		const dbArticle = (await ArticleSchema.findOne({ shortLink })) as IArticle;
		if (!dbArticle) {
			return new Response('404 Not Found', { status: 404 });
		}
		const { content } = dbArticle;
		const article = {
			_id: dbArticle._id,
			shortLink,
			title: dbArticle.title,
			description: dbArticle.description,
			cover: dbArticle.cover,
			category: dbArticle.category,
			tags: dbArticle.tags,
			authorId: dbArticle.authorId,
			status: dbArticle.status,
			views: dbArticle.views,
			likes: dbArticle.likes,
			link: dbArticle.link,
			createdAt: dbArticle.createdAt,
			updatedAt: dbArticle.updatedAt,
			html: ''
		};
		if (process.env.MEMORY_CACHE) {
			const result = (await cache.get(article.shortLink)) as string;
			if (result) {
				console.log('= recover from cache:', shortLink);
				article.html = result;
				return article;
			} else {
				const start = performance.now();
				const html = await render(content as string);
				const end = performance.now();
				const executionTime = Math.round(end - start);
				console.log(`+ render html for [${shortLink}] takes [${executionTime}] ms`);
				await cache.set(article.shortLink, html);
				article.html = html;
				return article;
			}
		} else {
			const html = await render(content as string);
			article.html = html;
			return article;
		}
	} catch (error) {
		return new Response(error as string, { status: 500 });
	}
});
