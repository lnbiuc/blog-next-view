<script lang="ts" setup>
// import { useFixedHeader } from 'vue-use-fixed-header'
import { useWindowScroll } from '@vueuse/core'
import { useFixedHeader } from 'vue-use-fixed-header'

import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'
import { useUserStore } from '~/store/UserStore'

const headerRef = ref(null)
const route = useRoute()
const showTitleY = ref(60)
const { y } = useWindowScroll()

const isPricingPage = computed(() => (!route.path.includes('/article')) || y.value < showTitleY.value)

const { styles } = useFixedHeader(headerRef, {
  watch: isPricingPage, // Will perform a check everytime the value changes
})

const width = ref(1200)

const isOpen = ref(true)

const isArticlePage = ref(false)

const shortLink = ref('')

const article = ref<IArticle>()

const { one } = useArticleStore()

watchEffect(() => {
  if (route.path.includes('/article/')) {
    isArticlePage.value = true
    const params = route.params as { shortLink: string }
    shortLink.value = params.shortLink
    one(shortLink.value).then((data) => {
      article.value = data
    })
    if (article.value && article.value.cover) {
      if (width.value < 767)
        showTitleY.value = 350

      else
        showTitleY.value = 700
    }
    else { showTitleY.value = 100 }
  }

  else { isArticlePage.value = false }
})

function disableScroll() {
  const x = window.scrollX
  const y = window.scrollY
  window.onscroll = function () {
    window.scrollTo(x, y)
  }
}

function enableScroll() {
  window.onscroll = function () { }
}

function handleResize() {
  width.value = window.innerWidth
}

onMounted(() => {
  handleResize()
  watchEffect(() => {
    if (!isOpen.value)
      disableScroll()
    else
      enableScroll()

    window.addEventListener('resize', handleResize)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const { hasAuth } = useUserStore()
</script>

<template>
  <div id="header" :class="{
    'dark:border-b-[#333] border-b-[#eee] shadow-sm dark:bg-opacity-50 backdrop-blur-md': y > 60,
    'justify-between items-start h-60px': width < 767,
    'justify-center items-center h-60px': width > 767,
    'h-full backdrop-blur-md': !isOpen,
  }"
    class="bg-white bg-opacity-60 border-b border-transparent flex flex-row fixed h-60px w-full z-999 transition-all duration-500 dark:bg-dark dark:bg-opacity-0 header-hidden-sign">
    <div class="flex flex-row max-w-1600px items-center" :class="{
    'justify-between w-full': width < 767,
    'justify-center w-80%': width > 767,
    'justify-between w-80': width > 767 && y > 60,
  }">
      <div class="flex flex-row h-60px w-100px items-center">
        <img src="/site-favicon.ico" class="ml-4 h-45px w-45px transition-all active:scale-95 hover:scale-105"
          alt="logo" @click="$router.push('/')">
      </div>
      <div class="violet-cus flex flex-col w-full">
        <Transition name="slide-fade">
          <div v-if="!isOpen" :class="{ 'flex justify-center': width > 767, 'flex justify-end': !isOpen }"
            class="hidden max-w-1000px w-full transition-all duration-500">
            <ul
              class="rounded-full ring-transparent ring-inset flex flex-row h-0px items-end transition-all duration-500 ring-1"
              :class="{
    'flex-col w-full': width < 767,
    'flex-row': width > 767,
    'items-start mt-60px mr-4': !isOpen,
    'ring-[#ccc] dark:ring-[#333] shadow h-35px': y < 80 && width > 767,
  }">
              <li :class="{ 'leading-12 text-2xl': !isOpen }">
                <NuxtLink to="/" class="header-link" @click="isOpen = true" :prefetch="true">
                  Home
                </NuxtLink>
              </li>
              <li :class="{ 'leading-12 text-2xl': !isOpen }">
                <NuxtLink to="/blog" class="header-link" @click="isOpen = true" :prefetch="true">
                  Blog
                </NuxtLink>
              </li>
              <li :class="{ 'leading-12 text-2xl': !isOpen }">
                <NuxtLink to="/shorts" class="header-link" @click="isOpen = true" :prefetch="true">
                  Short
                </NuxtLink>
              </li>
              <li :class="{ 'leading-12 text-2xl': !isOpen }">
                <NuxtLink to="/project" class="header-link" @click="isOpen = true" :prefetch="true">
                  Project
                </NuxtLink>
              </li>
              <li :class="{ 'leading-12 text-2xl': !isOpen }">
                <NuxtLink to="/friend" class="header-link" @click="isOpen = true" :prefetch="true">
                  Friend
                </NuxtLink>
              </li>
              <li :class="{ 'leading-12 text-2xl': !isOpen }">
                <NuxtLink to="/about" class="header-link" @click="isOpen = true" :prefetch="true">
                  About
                </NuxtLink>
              </li>
              <li v-if="hasAuth()" :class="{ 'leading-12 text-2xl': !isOpen }">
                <NuxtLink to="/violet" class="header-link" @click="isOpen = true">
                  Admin
                </NuxtLink>
              </li>
              <li :class="{ 'mr-4 mt-2 leading-12 text-2xl flex w-full flex-row items-center justify-end': !isOpen }"
                class="hidden">
                <DarkToggle @click="isOpen = true" />
              </li>
            </ul>
          </div>
        </Transition>
      </div>

      <div class="w-100px" :class="{ 'flex justify-end': width < 767 }">
        <DarkToggle :class="{ 'flex ': width > 767 }" class="hidden relative z-1100" />
        <div :class="{
    'flex': width < 767,
    'i-ri:menu-fill scale-150': isOpen,
    'i-ri:close-fill scale-180': !isOpen,
  }" class="mr-4 hidden flex-row h-60px items-center" @click="isOpen = !isOpen" />
      </div>
    </div>
  </div>

  <div class="flex flex-row justify-center header-hidden-sign">
    <header v-if="width > 767" ref="headerRef" class="Header flex flex-row justify-center" :style="{
    ...styles,
    position: isPricingPage ? 'relative' : 'fixed',
  }">
      <!-- Your content -->
      <div class="m-auto text-center flex max-w-1000px justify-center z-2000 transition-all" :class="{
    'items-end h-75px': isArticlePage && y > showTitleY,
    'items-center h-60px': !isArticlePage || (isArticlePage && y < showTitleY),
    'fixed top-0': isPricingPage,
  }">
        <ul class="rounded rounded-full ring-inset flex flex-row h-35px items-center transition-all" :class="{
    'flex-col w-full': width < 767,
    'flex-row': width > 767,
    'items-start mt-60px mr-4': !isOpen,
    'ring-[#ccc] ring-1 dark:ring-[#333] backdrop-blur-md': y < 60 || (isArticlePage && y > showTitleY),
  }">
          <li :class="{ 'h-50px text-2xl': !isOpen }">
            <NuxtLink to="/" class="header-link" @click="isOpen = true" :prefetch="true">
              Home
            </NuxtLink>
          </li>
          <li :class="{ 'h-50px text-2xl': !isOpen }">
            <NuxtLink to="/blog" class="header-link" @click="isOpen = true" :prefetch="true">
              Blog
            </NuxtLink>
          </li>
          <li :class="{ 'h-50px text-2xl': !isOpen }">
            <NuxtLink to="/shorts" class="header-link" @click="isOpen = true" :prefetch="true">
              Short
            </NuxtLink>
          </li>
          <li :class="{ 'h-50px text-2xl': !isOpen }">
            <NuxtLink to="/project" class="header-link" @click="isOpen = true" :prefetch="true">
              Project
            </NuxtLink>
          </li>
          <li :class="{ 'h-50px text-2xl': !isOpen }">
            <NuxtLink to="/friend" class="header-link" @click="isOpen = true" :prefetch="true">
              Friend
            </NuxtLink>
          </li>
          <li :class="{ 'h-50px text-2xl': !isOpen }">
            <NuxtLink to="/about" class="header-link" @click="isOpen = true" :prefetch="true">
              About
            </NuxtLink>
          </li>
          <li v-if="hasAuth()" :class="{ 'h-50px text-2xl': !isOpen }">
            <NuxtLink to="/violet" class="header-link" @click="isOpen = true">
              Admin
            </NuxtLink>
          </li>
        </ul>
      </div>
    </header>
  </div>
  <div class="h-60px" />
</template>

<style scoped>
.wave-animation {
  background: linear-gradient(to right,
      #8a2be2,
      rgb(106, 103, 206),
      #aa00ff,
      #7a2df3);
  background-size: 200% 200%;
  box-shadow: 0 0 150px 2px rgb(106, 103, 206);
}

.Header {
  position: fixed;
  /* or sticky */
  top: 0;
  z-index: 1000;
  align-items: center;
  text-align: center;
  margin: auto;
}

.NuxtLink-active {
  color: var(--color-violet) !important;
}
</style>
