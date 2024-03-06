import { ArticleSchema } from '~/server/models/article.schema';
import { cache } from '~/config/cache.config'
import process from 'node:process'
import { render } from '~/utils/markdown-render'

export default defineEventHandler(async event => {
	try {
		const shortLink = event.context.params?.shortLink;
		if (process.env.MEMORY_CACHE) {
			if (shortLink) {
				const result = await cache.get(shortLink);
				if (result) {
					console.log('= recover from cache:', shortLink);
					return result;
				} else {
					const queryres = await ArticleSchema.findOne({ shortLink }, { content: 1 }) as { _id: string, content: string };

					if (!queryres) {
						return new Response('404 Not Found', { status: 404 });
					}

					const { content } = queryres;

					const start = performance.now();
					const html = await render(content);
					const end = performance.now();
					const executionTime = Math.round(end - start);
					console.log(`+ render html for [${shortLink}] takes [${executionTime}] ms`,)
					await cache.set(shortLink, html);
					return html;
				}
			}
		} else {
			const queryres = await ArticleSchema.findOne({ shortLink }, { content: 1 }) as { _id: string, content: string };
			if (!queryres) {
				return new Response('404 Not Found', { status: 404 });
			}
			const html = await render(queryres.content);
			return html;
		}

	} catch (error) {
		return error;
	}
});
