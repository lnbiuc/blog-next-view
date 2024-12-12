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
    url: 'mailto:hi@vio.vin',
    icon: 'i-ri:mail-line',
  },
]
</script>

<template>
  <NuxtLayout name="home">
    <div
      class="sm:backdrop-blur-sm md:backdrop-blur-sm xl:backdrop-blur-sm lg:backdrop-blur-sm p-2 my-0 card-border rounded flex flex-col-reverse justify-center items-center lg:p-8 md:p-8 sm:p-2 xl:p-8 lg:my-10 md:my-10 sm:my-0 xl:my-10 lg:flex-row md:flex-row xl:flex-row sm:flex-col-reverse md:justify-between lg:card md:card sm:card xl:card"
    >
      <div
        class="flex flex-col w-full justify-start items-start lg:w-1/2 md:w-1/2 sm:w-full xl:w-1/2 md:justify-start md:items-start"
      >
        <h2 class="mb-2 text-4xl text-left">
          Hello! ✨
        </h2>
        <h2 class="text-4xl text-left">
          I'm
          <NuxtLink
            class="ml-2 text-violet-500 hover:underline" to="/about" prefetch
            style="font-family: 'MyFont', sans-serif;"
          >
            violet
          </NuxtLink>
        </h2>
        <span class="mb-2 mt-5 text-left">
          Currently focus on Java during work, and enjoy anything interesting in my free time.
        </span>
        <span class="mb-2 mt-5 text-left">
          Living and working in <a
            class="text-violet-500 hover:underline" href="https://unsplash.com/s/photos/xian"
            target="_blank"
          >Xi'an</a>.
        </span>
        <div class="mt-4 flex">
          <a
            v-for="l in link" :key="l.index" class="my-open-tab mr-3 flex flex-row justify-center items-center"
            :href="l.url" target="_blank" aria-label="icon"
          >
            <UIcon :name="l.icon" class="text-xl" />
            <span class="ml-1">
              {{ l.name }}
            </span>
          </a>
        </div>
      </div>
      <div
        class="mb-6 flex flex-row w-full justify-center items-center transition-all lg:mb-0 md:mb-0 sm:mb-6 xl:mb-0 lg:w-1/2 md:w-1/2 sm:w-full xl:w-1/2 lg:justify-end md:justify-end xl:justify-end sm:justify-center"
      >
        <NuxtImg
          src="/favicon.ico" alt="logo" :placeholder="[50, 25, 75, 5]" format="webp" loading="lazy" quality="50"
          class="rounded-full shadow-md h-[200px] w-[200px] transition-all hover:shadow-xl lg:h-[250px] lg:w-[250px] md:h-[250px] md:w-[250px] sm:h-[200px] sm:w-[200px] xl:h-[250px] xl:w-[250px]"
        />
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
