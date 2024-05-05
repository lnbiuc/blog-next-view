<script lang="ts" setup>
import type { IArticle } from "~/server/types";
import { useArticleStore } from "~/store/ArticleStore";

const shorts: Ref<IArticle[]> = ref([]);

const options: Ref<string[]> = ref(["Sort by date", "Sort by view"]);

const isLoading = ref<boolean>(false);

const { category } = useArticleStore();

const selected = ref("Sort by date");

async function getArticles() {
  const data = await category("short");

  data.forEach((article) => {
    let include = false;
    shorts.value.forEach((existArticle) => {
      if (article._id === existArticle._id) include = true;
    });
    if (!include) shorts.value.push(article);
  });

  handleSortByChange(selected.value);
}

getArticles();

async function handleParamsChange(searchVal: string) {
  if (searchVal === "ALL") {
    getArticles();
    return;
  }
  if (searchVal !== "") {
    isLoading.value = true;
    const { data } = await useFetch<IArticle[]>("/api/search/orama", {
      method: "POST",
      body: {
        category: "short",
        keyword: searchVal,
      },
    });

    shorts.value = [];

    if (data.value) {
      data.value.forEach((article) => {
        shorts.value.push(article);
      });
    }

    isLoading.value = false;
  } else {
    getArticles();
  }
}

async function handleSortByChange(selectVal: string) {
  selected.value = selectVal;
  if (selectVal === options.value[0]) {
    shorts.value.sort((a, b) => {
      // @ts-expect-error no error
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } else {
    shorts.value.sort((a, b) => {
      return b.views - a.views;
    });
  }
}

useSeoMeta({
  title: "Short | 薇尔薇",
  ogTitle: "Short | 薇尔薇",
  description: "薇尔薇 is A Web Developer. Code for Fun.",
  ogDescription: "薇尔薇 is A Web Developer. Code for Fun.",
});

const colorModel = useColorMode();

defineOgImage({
  component: "NuxtSeo",
  props: {
    title: "Short | 薇尔薇",
    description: "薇尔薇 is A Web Developer. Code for Fun.",
    theme: "#a78bfa",
    colorMode: () => (colorModel.preference === "dark" ? "dark" : "light"),
  },
});
</script>

<template>
  <div>
    <NuxtLayout name="common-view">
      <template #title> Short </template>
      <template #description>
        Short articles, usually some notes and code snippets.
      </template>
      <Search
        :is-loading="isLoading"
        category="short"
        @params-change="handleParamsChange"
        @sort-by-change="handleSortByChange"
      />
      <ShortCards :articles="shorts" />
    </NuxtLayout>
  </div>
</template>
