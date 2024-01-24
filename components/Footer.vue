<script setup lang="ts">
const link = [
  {
    index: 0,
    name: '',
    url: 'https://github.com/lnbiuc',
    icon: 'i-ri:github-line',
  },
  {
    index: 1,
    name: '',
    url: 'https://x.com/ZZSLL_53387',
    icon: 'i-ri:twitter-x-line',
  },
  {
    index: 2,
    name: '',
    url: 'https://space.bilibili.com/1258497845',
    icon: 'i-ri:bilibili-line',
  },
  {
    index: 3,
    name: '',
    url: 'mailto:hi@lnbiuc.com',
    icon: 'i-ri:mail-line',
  },
]
</script>

<template>
  <div class="mt-20 w-full flex flex-col items-center justify-center">
    <div text="xs gray4" class="h-[100px] w-full flex flex-row items-start justify-around overflow-hidden border-t border-t-gray-300 p-5 xl:m-2 lg:w-[80%] md:w-full sm:w-full xl:max-w-[1100px] xl:w-[80%] dark:border-t-gray-700">
      <div>
        <span>Copyright © 2023</span>
        <NuxtLink to="/about" class="mx-4">
          violet
        </NuxtLink>
        <a href="https://beian.miit.gov.cn/" target="_blank">陕ICP备2021015553号-1</a>
      </div>
      <div class="flex flex-row">
        <a
          v-for="l in link" :key="l.index" class="my-open-tab mr-3 flex flex-row items-center justify-center" :href="l.url"
          target="_blank"
        >
          <UIcon :name="l.icon" class="text-xl" />
          <span class="ml-1">
            {{ l.name }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
