<script setup lang="ts">
import 'animate.css'

const link = [
  {
    index: 0,
    name: 'Github',
    url: 'https://github.com/lnbiuc',
    icon: 'i-ri:github-line',
  },
  {
    index: 1,
    name: 'Twitter',
    url: 'https://twitter.com/ZZSLL_53387',
    icon: 'i-ri:twitter-x-fill',
  },
  {
    index: 3,
    name: 'Email',
    url: 'mailto:hi@lnbiuc.com',
    icon: 'i-ri:mail-add-line',
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
</script>

<template>
  <div style="height: calc(100vh - 160px)" class="m-auto max-w-[1400px] w-[100%] flex flex-col items-center justify-around md:flex-row">
    <div class="flex flex-col items-start justify-start md:items-start md:justify-start">
      <h1 class="text-left text-6xl font-bold">
        Hi!👋
      </h1>
      <h1 class="mt-5 text-6xl font-bold">
        I'm <span class="text-violet" style="font-family: 'MyFont', sans-serif;">Violet</span>
      </h1>
      <span class="mb-2 mt-5 text-2xl">
        A Web Developer 🖥. Code for Fun.
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
          v-for="l in link" :key="l.index" class="my-open-tab mr-3 flex flex-row items-center justify-center" :href="l.url"
          target="_blank"
        >
          <UIcon :name="l.icon" size="lg" />
          <span class="ml-1">
            {{ l.name }}
          </span>
        </a>
      </div>
    </div>
    <div class="hidden transition-transform duration-150 md:block hover:scale-105">
      <img src="/favicon.ico" alt="logo" class="favicon-shadown animate__bounceIn h-[300px] w-[300px] rounded-full">
    </div>
  </div>
  <div class="h-[100px] w-full flex flex-row justify-center">
    <div class="common-shadow icon-down i-carbon-arrow-down h-[40px] w-[40px] hover:cursor-pointer" @click="handleScroll" />
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'MyFont';
  src: url('/Spacewar.ttf') format('truetype');
}

.favicon-shadown {
  box-shadow: 0 0 150px 50px #8990b5;
}

.dark .favicon-shadown {
  box-shadow: 0 0 150px 50px #335062;
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
