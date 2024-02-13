<script setup lang="ts">
import { addHoverEffect } from '~/composables/hoverEffect'

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

function handleScroll() {
  const el = document.getElementById('featured')
  const yOffset = -80
  if (el) {
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition + yOffset

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

onMounted(() => {
  addHoverEffect('.favicon-shadow', 10)
})
</script>

<template>
  <div style="height: calc(100vh - 160px)" class="m-auto flex flex-col max-w-[1000px] w-[100%] justify-center items-center md:flex-row md:justify-between">
    <div class="flex flex-col justify-start items-start md:justify-start md:items-start">
      <h1 class="text-6xl font-bold text-left">
        Hi!👋
      </h1>
      <h1 class="mt-5 text-6xl font-bold">
        I'm <span class="text-violet" style="font-family: 'MyFont', sans-serif;">violet</span>
      </h1>
      <span class="mb-2 mt-5 text-2xl">
        A Web {{ '<Developer />' }}. {{ 'Code_' }} for Fun.
      </span>
      <div class="my-3 flex flex-row">
        <MyButton @click="$router.push('/blog')">
          Read the Blog
        </MyButton>
        <MyButton @click="$router.push('/about')">
          About Me
        </MyButton>
      </div>
      <div class="flex flex-row">
        <a
          v-for="l in link" :key="l.index" class="my-open-tab mr-3 flex flex-row justify-center items-center" :href="l.url"
          target="_blank"
        >
          <UIcon :name="l.icon" class="text-xl" />
          <span class="ml-1">
            {{ l.name }}
          </span>
        </a>
      </div>
    </div>
    <div class="hidden transition-all md:block">
      <img src="https://static.vio.vin/favicon.png/comporess1600x900" alt="logo" class="favicon-shadow rounded-full shadow-md h-[300px] w-[300px] transition-all hover:shadow-xl">
    </div>
  </div>
  <div class="flex flex-row h-[100px] w-full justify-center">
    <div class="common-shadow icon-down i-carbon-arrow-down h-[40px] w-[40px] hover:cursor-pointer" @click="handleScroll" />
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'MyFont';
  src: url('/Spacewar.ttf') format('truetype');
}

@keyframes jump {

  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(.8, 0, 1, 1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, .2, 1);
  }
}

.icon-down {
  animation: jump 1s ease-in-out infinite;
}

@media (max-width: 767px) {
  .flex-col.md\\:flex-row {
    flex-direction: column;
  }

  .md\\:items-center {
    align-items: center;
  }

  .md\\:justify-start {
    justify-content: flex-start;
  }

  .md\\:block {
    display: block;
  }

  .hidden {
    display: none;
  }
}
</style>
