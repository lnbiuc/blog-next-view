<script setup lang="ts">
import 'animate.css'

const link = [
  {
    index: 0,
    name: 'Github',
    url: 'https://github.com/lnbiuc',
    icon: 'i-carbon-logo-github',
  },
  {
    index: 1,
    name: 'Twitter',
    url: 'https://twitter.com/ZZSLL_53387',
    icon: 'i-carbon-logo-twitter',
  },
  {
    index: 3,
    name: 'Email',
    url: 'mailto:hi@lnbiuc.com',
    icon: 'i-heroicons-envelope-solid',
  },
]
</script>

<template>
  <div class="m-auto h-[80vh] max-w-[1400px] w-[100%] flex flex-col items-center justify-around md:flex-row">
    <div class="flex flex-col items-start justify-start md:items-start md:justify-start">
      <h1 class="text-left text-6xl font-bold">
        Hi!👋
      </h1>
      <h1 class="mt-5 text-6xl font-bold">
        I'm <span class="text-violet">Violet</span>
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
        <a v-for="l in link" :key="l.index" class="mr-3 flex flex-row items-center justify-center open-tab" :href="l.url" target="_blank">
          <UIcon
            :name="l.icon"
            size="lg"
          />
          <span class="ml-1">
            {{ l.name }}
          </span>
        </a>
      </div>
    </div>
    <div class="hidden transition-transform duration-150 md:block hover:scale-105">
      <img src="../public/favicon.ico" alt="logo" class="fade-in animate__bounceIn h-[300px] w-[300px] rounded-full">
    </div>
  </div>
  <div class="h-[100px] w-full flex flex-row justify-center hover:cursor-pointer">
    <div class="icon-down i-carbon-arrow-down fade-in h-[40px] w-[40px]" />
  </div>
</template>

<style scoped>
  .open-tab {
    cursor: url(/new-tab.png) 10 10,pointer
  }
  @keyframes jump {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(.8,0,1,1);
    }

    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0,0,.2,1);
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

.fade-in {
  box-shadow:
  2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
  6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
  12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
  22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
  41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
  100px 100px 80px rgba(0, 0, 0, 0.07);
}
</style>
