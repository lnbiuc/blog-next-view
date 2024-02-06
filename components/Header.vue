<script lang="ts" setup>
// import { useFixedHeader } from 'vue-use-fixed-header'
import { useWindowScroll } from '@vueuse/core'
import { useFixedHeader } from 'vue-use-fixed-header'
import type { ArticleWithContent } from '~/server/types/article'
import { usePreloadCacheStore } from '~/store'

const headerRef = ref(null)

const { styles } = useFixedHeader(headerRef)

const { y } = useWindowScroll()

const width = ref(1200)

const isOpen = ref(true)
const route = useRoute()

const isArticlePage = ref(false)

const shortLink = ref('')

const article = ref<ArticleWithContent>()

const store = usePreloadCacheStore()

const showTitleY = ref(60)
watchEffect(() => {
  if (route.path.includes('/article/')) {
    isArticlePage.value = true
    const params = route.params as { shortLink: string }
    shortLink.value = params.shortLink
    article.value = store.getArticleCache(shortLink.value)
    if (article.value && article.value.cover.length > 0) {
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
</script>

<template>
  <div
    :class="{ 'dark:border-b-[#333] border-b-[#eee] shadow-sm dark:bg-opacity-50': y > 60,
              'justify-between items-start h-60px': width < 767,
              'justify-center items-center h-60px': width > 767,
              'h-full': !isOpen,
    }"
    class="fixed z-999 h-60px w-full flex flex-row border-b border-transparent bg-white bg-opacity-50 backdrop-blur-md transition-all dark:bg-dark dark:bg-opacity-0"
  >
    <div class="max-w-1600px flex flex-row items-center" :class="{ 'justify-between w-full': width < 767, 'justify-center w-80%': width > 767 }">
      <div class="h-60px w-100px flex flex-row items-center">
        <img src="/favicon.ico" class="ml-4 h-40px w-40px transition-all active:scale-95 hover:scale-105" @click="$router.push('/')">
      </div>
      <Transition name="slide">
        <div v-if="y > showTitleY && isArticlePage && width > 767" class="max-w-1000px w-full flex flex-col items-start justify-start overflow-hidden text-ellipsis">
          <p class="overflow-hidden text-ellipsis text-xl font-semibold">
            {{ article?.title }}
          </p>
          <p class="overflow-hidden text-ellipsis text-xs text-gray-500">
            {{ article?.category.toLowerCase() }} / {{ article?.shortLink }}
          </p>
        </div>
        <div
          v-else
          :class="{ 'flex justify-center': width > 767, 'flex justify-end': !isOpen }"
          class="hidden max-w-1000px w-full"
        >
          <ul
            class="h-0px flex flex-row items-center rounded-full ring-1 ring-transparent ring-inset transition-all"
            :class="{
              'flex-col w-full': width < 767,
              'flex-row': width > 767,
              'items-start mt-60px mr-4': !isOpen,
              'ring-[#ccc] dark:ring-[#333] shadow nav-shadow ': y < 80 && width > 767,
            }"
          >
            <li :class="{ 'leading-10 text-2xl': !isOpen }">
              <router-link to="/" class="header-link" @click="isOpen = true">
                Home
              </router-link>
            </li>
            <li :class="{ 'leading-10 text-2xl': !isOpen }">
              <router-link to="/blog" class="header-link" @click="isOpen = true">
                Blog
              </router-link>
            </li>
            <li :class="{ 'leading-10 text-2xl': !isOpen }">
              <router-link to="/shorts" class="header-link" @click="isOpen = true">
                Short
              </router-link>
            </li>
            <li :class="{ 'leading-10 text-2xl': !isOpen }">
              <router-link to="/project" class="header-link" @click="isOpen = true">
                Project
              </router-link>
            </li>
            <li :class="{ 'leading-10 text-2xl': !isOpen }">
              <router-link to="/about" class="header-link" @click="isOpen = true">
                About
              </router-link>
            </li>
            <li :class="{ 'leading-10 text-2xl flex w-full flex-row items-center justify-center': !isOpen }" class="hidden">
              <DarkToggle @click="isOpen = true" />
            </li>
          </ul>
        </div>
      </Transition>
      <div
        class="w-100px"
        :class="{ 'flex justify-end': width < 767 }"
      >
        <DarkToggle :class="{ 'flex ': width > 767 }" class="relative z-1100 hidden" />
        <div
          :class="{
            'flex': width < 767,
            'i-ri:menu-fill scale-150': isOpen,
            'i-ri:close-fill scale-180': !isOpen,
          }"
          class="mr-4 hidden h-60px flex-row items-center"
          @click="isOpen = !isOpen"
        />
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-center">
    <header
      v-if="y > showTitleY && isArticlePage && width > 767"
      ref="headerRef"
      class="Header"
      :style="styles"
    >
      <!-- Your content -->
      <div
        class="top-90px z-2000 m-auto h-75px max-w-1000px flex items-end justify-center text-center"
      >
        <ul
          class="h-35px flex flex-row items-center rounded rounded-full shadow ring-1 ring-[#ccc] ring-transparent ring-inset backdrop-blur-md transition-all dark:ring-[#333]"
          :class="{
            'flex-col w-full': width < 767,
            'flex-row': width > 767,
            'items-start mt-60px mr-4': !isOpen,
          }"
        >
          <li :class="{ 'h-50px text-2xl': !isOpen }">
            <router-link to="/" class="header-link" @click="isOpen = true">
              Home
            </router-link>
          </li>
          <li :class="{ 'h-50px text-2xl': !isOpen }">
            <router-link to="/blog" class="header-link" @click="isOpen = true">
              Blog
            </router-link>
          </li>
          <li :class="{ 'h-50px text-2xl': !isOpen }">
            <router-link to="/shorts" class="header-link" @click="isOpen = true">
              Short
            </router-link>
          </li>
          <li :class="{ 'h-50px text-2xl': !isOpen }">
            <router-link to="/project" class="header-link" @click="isOpen = true">
              Project
            </router-link>
          </li>
          <li :class="{ 'h-50px text-2xl': !isOpen }">
            <router-link to="/about" class="header-link" @click="isOpen = true">
              About
            </router-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
  <div class="h-60px" />
</template>

<style scoped>
.wave-animation {
  background: linear-gradient(
    to right,
    #8a2be2,
    rgb(106, 103, 206),
    #aa00ff,
    #7a2df3
  );
  background-size: 200% 200%;
  box-shadow: 0 0 150px 2px rgb(106, 103, 206);
}

.Header {
  position: fixed; /* or sticky */
  top: 0;
  z-index: 1000;
  align-items: center;
  text-align: center;
  margin: auto;
}

.router-link-active  {
  color: var(--color-violet) !important;
}
</style>
