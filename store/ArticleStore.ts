import { defineStore } from 'pinia';
import type { IArticle } from '~/server/types';
import type { MDCParserResult } from '@nuxtjs/mdc/runtime/types/index';

export const useArticleStore = defineStore('articleStore', () => {
	const articles: Ref<IArticle[]> = ref([]);

	const article: Record<string, IArticle> = reactive({});

	const pending = ref<string[]>([]);

	async function getAll() {
		if (articles.value.length > 0) return articles.value;

		const { data } = await useFetch<IArticle[]>('/api/article');
		articles.value = [];
		if (data.value) {
			data.value.forEach(article => {
				articles.value.push(article);
			});
		}
	}

	async function getOne(shortLink: string) {
		const cached = article[shortLink];

		if (cached) {
			return cached;
		} else {
			const cachedInfo = articles.value.find(article => article.shortLink === shortLink);
			if (cachedInfo) {
				const html = await getHtml(shortLink);
				cachedInfo.html = html;
				article[shortLink] = cachedInfo;
				return article[shortLink];
			} else {
				const { data } = await useFetch<IArticle>(`/api/article/${shortLink}`);
				if (data.value) {
					article[shortLink] = data.value;
					return data.value;
				}
			}
		}
	}

	async function category(category: string): Promise<IArticle[]> {
		if (articles.value.length === 0) await getAll();

		return articles.value
			.filter(article => article.category === category)
			.sort((a, b) => {
				// @ts-expect-error no error
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			});
	}

	async function one(shortLink: string): Promise<IArticle | undefined> {
		if (!article[shortLink]) {
			const article = await getOne(shortLink);
			return article;
		} else {
			return article[shortLink];
		}
	}

	async function getHtml(shortLink: string) {
		if (pending.value.find(p => p === shortLink) === undefined) {
			pending.value.push(shortLink);
			const { data } = await useFetch<MDCParserResult>(`/api/article/rendered/${shortLink}`);
			if (data.value) {
				const indexToRemove = pending.value.indexOf(shortLink);
				if (indexToRemove !== -1) {
					pending.value.splice(indexToRemove, 1);
				}
				return data.value;
			}
		}
	}

	return { category, one, getAll };
});
