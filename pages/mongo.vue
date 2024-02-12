<script setup lang="ts">
import type { IArticle } from '~/server/types'

const res = ref('')

const article: Ref<IArticle> = ref({
  shortLink: 'sample-short-link',
  title: 'Sample Title',
  description: 'Sample Description',
  cover: 'sample-cover-url',
  category: 'sample-category',
  tags: ['tag1', 'tag2'],
  content: 'Sample content',
  authorId: 'sample-author-id',
  status: 'sample-status',
  views: 0,
  likes: 0,
  ogImage: 'sample-og-image-url',
  link: 'sample-link',
})

async function handleClick() {
//   const { data, refresh } = await useFetch('/api/user')
  //   console.log(data)

  //   const data = useFetch('/api/user/create', {
  //     method: 'POST',
  //     body: {
  //       nickname: 'violet',
  //       password: 'Dd112211',
  //     },
  //   })

  //   const { data } = useFetch('/api/user')
  //   const { data } = useFetch('/api/article/create', {
  //     method: 'POST',
  //     body: article,
  //   })

  const { data } = useFetch('/api/article/category/article')
  console.warn(data)
}
</script>

<template>
  <div>
    <p>{{ res }}</p>
    <MyButton class="w-30" @click="handleClick">
      click
    </MyButton>
  </div>
</template>
