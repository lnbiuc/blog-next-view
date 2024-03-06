import { defineStore } from 'pinia';
import type { IArticle } from '~/server/types';

export const useArticleStore = defineStore('articleStore', () => {
	const articles: Ref<IArticle[]> = ref([]);

	const article: Record<string, IArticle> = reactive({});

	const pending = ref<string[]>([])

	async function getAll() {
		const { data } = await useFetch<IArticle[]>('/api/article');
		articles.value = [];
		if (data.value) {
			data.value.forEach(article => {
				articles.value.push(article);
			});
		}
	}

	async function getOne(shortLink: string) {

		const cached = articles.value.find(article => article.shortLink === shortLink);

		if (cached) {
			const i = articles.value.indexOf(cached)
			if (pending.value.find(p => p === shortLink) === undefined) {
				pending.value.push(shortLink);
				const { data } = await useFetch<string>(`/api/article/rendered/${shortLink}`);
				if (data.value) {
					articles.value[i].html = data.value;
					article[shortLink] = articles.value[i];
				}
				const indexToRemove = pending.value.indexOf(shortLink);
				if (indexToRemove !== -1) {
					pending.value.splice(indexToRemove, 1);
				}
				return articles.value[i];
			}
		} else {
			const { data } = await useFetch<IArticle>(`/api/article/${shortLink}`);
			if (data.value) article[shortLink] = data.value;
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

	async function one(shortLink: string): Promise<IArticle> {
		if (!article[shortLink]) await getOne(shortLink);

		return article[shortLink];
	}
	return { category, one, getAll };
});
