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
  <NuxtLayout name="home">
    <div
      class="m-auto flex flex-col-reverse sm:flex-col-reverse md:flex-row xl:flex-row lg:flex-row justify-center items-center md:flex-row md:justify-between p-8 my-0 sm:my-0 md:my-10 xl:my-10 lg:my-10 rounded sm:card md:card xl:card lg:card card-border sm:backdrop-blur-sm md:backdrop-blur-sm xl:backdrop-blur-sm lg:backdrop-blur-sm rounded-lg">
      <div
        class="flex flex-col justify-start items-start md:justify-start md:items-start sm:w-full md:w-1/2 xl:w-1/2 lg:w-1/2 w-full">
        <h2 class="text-6xl font-bold text-left mb-2">
          Hello!
        </h2>
        <h2 class="text-6xl font-bold text-left">
          I'm
          <NuxtLink class="text-violet ml-2 hover:underline" to="/about" prefetch
            style="font-family: 'MyFont', sans-serif;">
            violet
          </NuxtLink>
        </h2>
        <span class="mb-2 mt-5 text-xl font-mono text-left">
          I focus on Java during work and enjoy anything interesting in my free time.
        </span>
        <span class="mb-2 mt-5 text-xl font-mono text-left">
          Living and working in <a class="text-violet hover:underline" href="https://unsplash.com/s/photos/xian"
            target="_blank">Xi'an</a>.
        </span>
        <div class="flex  mt-4">
          <a v-for="l in link" :key="l.index" class="my-open-tab mr-3 flex flex-row justify-center items-center"
            :href="l.url" target="_blank" aria-label="icon">
            <UIcon :name="l.icon" class="text-xl" />
            <span class="ml-1">
              {{ l.name }}
            </span>
          </a>
        </div>
      </div>
      <div
        class="transition-all sm:w-full md:w-1/2 xl:w-1/2 lg:w-1/2 w-full mb-6 sm:mb-6 md:mb-0 xl:mb-0 lg:mb-0 flex flex-row items-center justify-center sm:justify-center md:justify-end xl:justify-end lg:justify-end">
        <img src="/favicon.ico" alt="logo"
          class="rounded-full shadow-md h-[300px] w-[300px] transition-all hover:shadow-xl">
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
@font-face {
  font-family: 'MyFont';
  src: url('/Spacewar.ttf') format('truetype');
}
</style>
