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
  }

  else {
    isArticlePage.value = false
  }

  showTitleY.value = 80
})

const { hasAuth } = useUserStore()

const showShadow = computed(() => {
  return !isFixed.value || y.value > showTitleY.value
})

const isTransparent = computed(() => {
  if (route.path.includes('/article'))
    return false
  else
    return y.value > showTitleY.value
})

const readProgress = ref<number>(0)

const { width, height } = useWindowSize()

watchEffect(() => {
  if (document) {
    const calc = (y.value - showTitleY.value) / (document.body.scrollHeight - height.value - showTitleY.value)
    if (calc < 0)
      readProgress.value = 0
    else if (calc > 1)
      readProgress.value = 1

    else
      readProgress.value = calc
  }
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
    class="border-b border-transparent font-sans flex flex-row fixed h-60px w-full justify-around items-center z-999 transition-all"
    :class="{
      'shadow border-[#eee] dark:border-[#222] dark:bg-opacity-50 bg-opacity-50 backdrop-blur-xl': showShadow && !isOpen,
      'bg-light dark:bg-dark dark:bg-opacity-100 bg-opacity-100': isOpen,
    }"
  >
    <div class="mx-2 mr-4 rounded-3 flex flex-row h-45px w-45px cursor-pointer justify-center items-center">
      <img src="/site-favicon.ico" class="object-cover rounded-3 shadow-md" @click="$router.push('/')">
    </div>
    <div
      class="flex flex-row w-full justify-center items-center lg:w-[80%] md:w-full sm:w-full xl:max-w-[1000px] xl:w-[80%]"
    >
      <div class="flex flex-row w-full justify-around items-center">
        <div name="title" class="flex flex-1 flex-row w-50% justify-start">
          <Transition name="slide">
            <div v-if="!isFixed">
              <div
                class="whitespace-no-wrap text-xl truncate text-ellipsis max-w-50 overflow-hidden lg:max-w-unset md:max-w-unset sm:max-w-unset xl:max-w-unset"
              >
                {{ article?.title }}
              </div>
              <div
                class="whitespace-no-wrap text-xs text-gray-500 truncate text-ellipsis max-w-50 overflow-hidden lg:max-w-unset md:max-w-unset sm:max-w-unset xl:max-w-unset"
              >
                {{ article?.category }} / {{ article?.shortLink }}
              </div>
            </div>
          </Transition>
          <div>&nbsp;</div>
        </div>
        <div
          class="hidden justify-center items-center z-1000 lg:flex md:flex sm:flex xl:flex"
          :class="{ fixed: isFixed, relative: !isFixed }"
        >
          <header
            ref="headerRef" class="m-auto flex justify-center items-center" :style="{
              ...styles,
              position: isFixed ? 'relative' : 'fixed',
            }"
          >
            <ul
              class="border rounded-full flex flex-row h-40px items-center transition-all" :class="{
                'mt-52px dark:border-[#222] border-[#eee] bg-light dark:bg-dark shadow backdrop-blur-2xl': !isFixed,
                'dark:border-[#222] border-[#eee]  bg-light dark:bg-dark shadow backdrop-blur-2xl dark:bg-opacity-50 bg-opacity-50': !showShadow,
                'border-transparent': isTransparent,
              }"
            >
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
              <!-- <li>
                <NuxtLink to="/project" class="header-link" :prefetch="true">
                  Project
                </NuxtLink>
              </li> -->
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
        <div name="rate" class="mr-0 flex flex-1 flex-row w-50% justify-end lg:mr-4 md:mr-4 sm:mr-4 xl:mr-4">
          <Transition name="slide">
            <div v-if="!isFixed">
              {{ Math.round(readProgress * 100) }}
              <span class="text-violet">%</span>
            </div>
          </Transition>
          <div>&nbsp;</div>
        </div>
        <div class="flex lg:hidden md:hidden sm:hidden xl:hidden" name="openMenu" @click="isOpen = !isOpen">
          <div class="mr-4 scale-140" :class="{ 'i-ri:menu-fold-fill': !isOpen, 'i-ri:close-line': isOpen }" />
        </div>
      </div>
    </div>
    <div class="hidden w-50px lg:flex md:flex sm:flex xl:flex">
      <DarkToggle />
    </div>
  </div>

  <div class="h-60px" />

  <div
    name="v-header"
    class="bg-light flex fixed h-0 w-full justify-end top-60px z-6000 transition-all lg:hidden md:hidden sm:hidden xl:hidden dark:bg-dark"
    :class="{ 'h-full': isOpen }"
  >
    <Transition name="slide-fade">
      <ul v-if="isOpen" class="flex flex-col items-end">
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
        <!-- <li class="mobile-head-link">
          <NuxtLink to="/project" class="header-link" :prefetch="true" @click="isOpen = !isOpen">
            Project
          </NuxtLink>
        </li> -->
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
        <li class="mr-5 mobile-head-link">
          <DarkToggle @click="isOpen = !isOpen" />
        </li>
      </ul>
    </Transition>
  </div>
</template>
