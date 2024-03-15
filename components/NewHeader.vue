<script setup lang="ts">
import { useFixedHeader } from 'vue-use-fixed-header'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'
import { useUserStore } from '~/store/UserStore'

const headerRef = ref(null)
// const width = ref(1200)
const { y } = useWindowScroll()
const route = useRoute()
const showTitleY = ref(100)


const isFixed = computed(() => (!route.path.includes('/article')) || y.value < showTitleY.value)

const { styles } = useFixedHeader(headerRef, {
  watch: isFixed, // Will perform a check everytime the value changes
})

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
  }

  else {
    isArticlePage.value = false
    showTitleY.value = 100
  }
})

const { hasAuth } = useUserStore()

const showShadow = computed(() => {
  return !isFixed.value || y.value > showTitleY.value
})

const isTransparent = computed(() => {
  if (route.path.includes('/article')) {
    return false
  } else {
    return y.value > showTitleY.value
  }
})

const readProgress = ref<number>(0)

const { width, height } = useWindowSize()

watchEffect(() => {

  if (document) {
    const calc = (y.value - showTitleY.value) / (document.body.scrollHeight - height.value - showTitleY.value)
    if (calc < 0) {
      readProgress.value = 0
    } else if (calc > 1) {
      readProgress.value = 1
    }

    else {
      readProgress.value = calc
    }
  }
})

const isMobile = computed(() => {
  return width.value < 767
})

const displaySubHeader = computed(() => {
  return !isMobile
})

const isOpen = ref(false)


function enableScroll() {
  window.onscroll = function () { }
}

function disableScroll() {
  const x = window.scrollX
  const y = window.scrollY
  window.onscroll = function () {
    window.scrollTo(x, y)
  }
}

onMounted(() => {
  watchEffect(() => {
    if (isOpen.value)
      disableScroll()
    else
      enableScroll()
  })
})
</script>

<template>
  <div
    class="w-full flex flex-row justify-around h-60px items-center fixed z-999 transition-all  border-b border-transparent dark:bg-opacity-50 bg-opacity-50"
    :class="{
      'shadow border-[#eee] dark:border-[#222]': showShadow && !isOpen,
      'backdrop-blur-xl bg-light dark:bg-dark': showShadow
    }">
    <div class="rounded-3 cursor-pointer mx-2 mr-4 w-45px h-45px flex flex-row justify-center items-center">
      <img src="/site-favicon.ico" class="object-cover" @click="$router.push('/')" />
    </div>
    <div
      class="flex flex-row items-center w-full justify-center lg:w-[80%] md:w-full sm:w-full xl:max-w-[1000px] xl:w-[80%]">
      <div class="flex flex-row items-center w-full justify-around">
        <div name="title" class="w-50% flex flex-row justify-start flex-1">
          <Transition name="slide">
            <div v-if="!isFixed">
              <div class="text-xl font-semibold text-ellipsis overflow-hidden whitespace-no-wrap truncate"
                :class="{ 'max-w-60': isMobile }">
                {{ article?.title }}
              </div>
              <div class="text-xs text-gray-500 text-ellipsis overflow-hidden whitespace-no-wrap truncate"
                :class="{ 'max-w-60': isMobile }">
                {{ article?.category }} / {{ article?.shortLink }}
              </div>
            </div>
          </Transition>
          <div>&nbsp;</div>
        </div>
        <div v-if="!isMobile" class="flex items-center justify-center z-1000"
          :class="{ 'fixed': isFixed, 'relative': !isFixed }">
          <header ref="headerRef" class="flex items-center justify-center m-auto" :style="{
      ...styles,
      position: isFixed ? 'relative' : 'fixed',
    }">
            <ul class="flex flex-row items-center transition-all  h-36px border rounded-full " :class="{
      'mt-52px dark:border-[#222] border-[#eee] bg-light dark:bg-dark shadow backdrop-blur-2xl': !isFixed,
      'dark:border-[#222] border-[#eee]  bg-light dark:bg-dark shadow backdrop-blur-2xl dark:bg-opacity-50 bg-opacity-50': !showShadow,
      'border-transparent': isTransparent,
    }">
              <li>
                <NuxtLink to="/" class="header-link" :prefetch="true">
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/blog" class="header-link" :prefetch="true">
                  Blog
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/shorts" class="header-link" :prefetch="true">
                  Short
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/project" class="header-link" :prefetch="true">
                  Project
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/friend" class="header-link" :prefetch="true">
                  Friend
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about" class="header-link" :prefetch="true">
                  About
                </NuxtLink>
              </li>
              <li v-if="hasAuth()">
                <NuxtLink to="/violet" class="header-link">
                  Admin
                </NuxtLink>
              </li>
            </ul>
          </header>
        </div>
        <div name="rate" class="w-50% flex flex-row justify-end flex-1" :class="{ 'mr-4': isMobile }">
          <Transition name="slide">
            <div v-if="!isFixed">
              {{ Math.round(readProgress * 100) }}
              <span class="text-violet">%</span>
            </div>
          </Transition>
          <div>&nbsp;</div>
        </div>
        <div v-if="isMobile" name="openMenu" @click="isOpen = !isOpen">
          <div class="scale-140 mr-4" :class="{ 'i-ri:menu-fold-fill': !isOpen, 'i-ri:close-line': isOpen }"></div>
        </div>
      </div>
    </div>
    <div class="w-50px" v-if="!isMobile">
      <DarkToggle />
    </div>
  </div>

  <div class="h-60px"></div>

  <div v-if="isMobile" name="v-header"
    class="fixed top-60px backdrop-blur-xl z-6000 h-0 w-full transition-all  bg-light dark:bg-dark dark:bg-opacity-80 bg-opacity-80"
    :class="{ 'h-full': isOpen }">
    <Transition name="slide-fade">
      <ul class="flex flex-col items-end" v-if="isOpen">
        <li class="mobile-head-link">
          <NuxtLink to="/" class="header-link" :prefetch="true" @click="isOpen = !isOpen">
            Home
          </NuxtLink>
        </li>
        <li class="mobile-head-link">
          <NuxtLink to="/blog" class="header-link" :prefetch="true" @click="isOpen = !isOpen">
            Blog
          </NuxtLink>
        </li>
        <li class="mobile-head-link">
          <NuxtLink to="/shorts" class="header-link" :prefetch="true" @click="isOpen = !isOpen">
            Short
          </NuxtLink>
        </li>
        <li class="mobile-head-link">
          <NuxtLink to="/project" class="header-link" :prefetch="true" @click="isOpen = !isOpen">
            Project
          </NuxtLink>
        </li>
        <li class="mobile-head-link">
          <NuxtLink to="/friend" class="header-link" :prefetch="true" @click="isOpen = !isOpen">
            Friend
          </NuxtLink>
        </li>
        <li class="mobile-head-link">
          <NuxtLink to="/about" class="header-link" :prefetch="true" @click="isOpen = !isOpen">
            About
          </NuxtLink>
        </li>
        <li v-if="hasAuth()" class="mobile-head-link" @click="isOpen = !isOpen">
          <NuxtLink to="/violet" class="header-link">
            Admin
          </NuxtLink>
        </li>
        <li class="mobile-head-link mr-5">
          <DarkToggle @click="isOpen = !isOpen" />
        </li>
      </ul>
    </Transition>
  </div>
</template>
