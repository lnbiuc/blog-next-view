import { ArticleSchema } from '~/server/models/article.schema';
import type { IArticle } from '~/server/types';
import process from 'node:process';
import { cache } from '~/config/cache.config';
import { useMarkdownParser } from '~/composables/useMarkdownParser';
import type { MDCParserResult } from '@nuxtjs/mdc/runtime/types/index';

export default defineEventHandler(async event => {
	const parse = useMarkdownParser();

	try {
		const shortLink = event.context.params?.shortLink as string;
		if (!shortLink) {
			return new Response('ShortLink Require', { status: 404 });
		}

		const article = (await ArticleSchema.findOne({ shortLink })) as IArticle;
		if (!article) {
			return new Response('Article Not Found', { status: 404 });
		}
		const { content } = article;

		if (process.env.MEMORY_CACHE) {
			const result = (await cache.get(article.shortLink)) as MDCParserResult;
			if (result) {
				console.log('= recover from cache:', shortLink);
				article.html = result as MDCParserResult;
				// @ts-expect-error
				return { ...article._doc, html: html };
			} else {
				const start = performance.now();
				const html = await parse(content as string);
				const end = performance.now();
				const executionTime = Math.round(end - start);
				console.log(`+ render html for [${shortLink}] takes [${executionTime}] ms`);
				await cache.set(article.shortLink, html);
				article.html = html as MDCParserResult;
				// @ts-expect-error
				return { ...article._doc, html: html };
			}
		} else {
			const html = await parse(content as string);
			article.content = '';
			// @ts-expect-error
			return { ...article._doc, html: html };
		}
	} catch (error) {
		return new Response(error as string, { status: 500 });
	}
});
