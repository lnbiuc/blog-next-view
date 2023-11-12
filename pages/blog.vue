<script setup lang="ts">
import { getAllTag } from '~/server/api/tag'

const value: Ref<string> = ref('')
const tag = [
  {
    name: 'JavaScript',
    index: 1,
  },
  {
    name: 'TypeScript',
    index: 2,
  },
  {
    name: 'VUE',
    index: 3,
  },
  {
    name: 'React',
    index: 4,
  },
  {
    name: 'Java',
    index: 5,
  },
]

const tags: Ref<string[]> = ref([''])

const res = await getAllTag()
tags.value = res.data.value?.data
</script>

<template>
  <NuxtLayout name="home">
    <div class="flex flex-row">
      <div class="w-full text-left">
        <h1 class="text-5xl font-bold text-violet">
          Blog
        </h1>
        <div class="py-4">
          <span>Thoughts, mental models, and tutorials about front-end development.</span>
        </div>
        <div>
          <UInput
            v-model="value"
            icon="i-heroicons-magnifying-glass-20-solid" size="xl" placeholder="Search..."
          />
        </div>
        <div class="my-4">
          <span class="mr-2 text-lg">Tags:</span>
          <UButton v-for="t in tags" :key="t" class="m-1" :tag="t">
            {{ t }}
          </UButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
