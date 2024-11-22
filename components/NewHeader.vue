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

const isFixed = computed(
  () => !route.path.includes('/article') || y.value < showTitleY.value,
)

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

const showShadow = ref(false)

const isTransparent = computed(() => {
  if (route.path.includes('/article'))
    return false
  else return y.value > showTitleY.value
})

const readProgress = ref<number>(0)

const { height, width } = useWindowSize()

watchEffect(() => {
  if (document) {
    const calc
      = (y.value - showTitleY.value)
      / (document.body.scrollHeight - height.value - showTitleY.value)
    if (calc < 0)
      readProgress.value = 0
    else if (calc > 1)
      readProgress.value = 1
    else readProgress.value = calc
  }
})

const isOpen = ref(false)

function enableScroll() {
  window.onscroll = function () {}
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
    else enableScroll()

    showShadow.value = !isFixed.value || y.value > showTitleY.value
  })
})

const router = useRouter()

function handleClickFavicon() {
  router.push('/')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const links = ref([
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Short',
    href: '/shorts',
  },
])

useFetch<Array<IArticle>>('/api/article/pages').then((res) => {
  if (res.data.value) {
    res.data.value
      .sort((a, b) => Number.parseInt(a.link as string) - Number.parseInt(b.link as string))
      .forEach((item) => {
        const link = {
          name: item.title,
          href: `/${item.shortLink}`,
        }
        links.value.push(link)
      })
  }
})
</script>

<template>
  <div
    class="border-b-[#eee] font-sans flex flex-row fixed h-[60px] w-full justify-around items-center z-[999]  dark:border-b-[#222]"
    :class="{
      'dark:bg-opacity-50 bg-opacity-50 backdrop-blur-xl border-b transition-all':
        showShadow && !isOpen,
      'dark:bg-dark bg-light': isOpen,
    }"
  >
    <div
      class="rounded-3 flex flex-row h-[45px] w-[45px] aspect-1/1 cursor-pointer justify-center items-center"
    >
      <NuxtImg
        src="/favicon.ico" alt="logo" :placeholder="[50, 25, 75, 5]" format="webp" loading="lazy" quality="1"
        class="rounded-lg shadow h-10 w-10 aspect-1/1 ml-2"
        @click="handleClickFavicon"
      />
    </div>
    <div
      class="flex flex-row w-full justify-center items-center lg:w-[80%] md:w-full sm:w-full xl:max-w-[1000px] xl:w-[80%]"
    >
      <div class="flex flex-row w-full justify-around items-center">
        <div name="title" class="flex flex-1 flex-row justify-start ml-2 text-ellipsis truncate" :style="{ maxWidth: `${width - 100}px` }">
          <Transition name="slide">
            <div v-if="!isFixed">
              <div
                class="whitespace-no-wrap text-xl"
              >
                {{ article?.title }}
              </div>
              <div
                class="whitespace-no-wrap text-xs text-gray-500"
              >
                {{ article?.category }} / {{ article?.shortLink }}
              </div>
            </div>
          </Transition>
          <div>&nbsp;</div>
        </div>
        <div
          class="hidden justify-center items-center z-[1000] lg:flex md:flex sm:flex xl:flex"
          :class="{ fixed: isFixed, relative: !isFixed }"
        >
          <header
            ref="headerRef"
            class="m-auto flex justify-center items-center"
            :style="{
              ...styles,
              position: isFixed ? 'relative' : 'fixed',
            }"
          >
            <ul
              class="border rounded-full flex flex-row h-[40px] items-center transition-all"
              :class="{
                'mt-[52px] dark:border-[#222] border-[#eee] dark:bg-dark bg-light':
                  !isFixed,
                'dark:border-[#222] border-[#eee]':
                  !showShadow,
                'border-transparent': isTransparent,
              }"
            >
              <li v-for="link in links" :key="link.href">
                <NuxtLink :to="`${link.href}`" class="header-link" :prefetch="true">
                  {{ link.name }}
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
        <div
          v-if="width > 640"
          name="rate"
          class="mr-0 flex w-[100px] flex-1 flex-row w-20% justify-end lg:mr-4 md:mr-4 sm:mr-4 xl:mr-4"
        >
          <Transition name="slide">
            <div v-if="!isFixed">
              {{ Math.round(readProgress * 100) }}
              <span class="text-violet">%</span>
            </div>
          </Transition>
          <div>&nbsp;</div>
        </div>
        <div
          class="flex lg:hidden md:hidden sm:hidden xl:hidden"
          name="openMenu"
          @click="isOpen = !isOpen"
        >
          <Icon v-if="!isOpen" name="ri:menu-fold-fill" class="mr-4 h-8 w-8" />
          <Icon v-else name="ri:close-line" class="mr-4 h-8 w-8" />
        </div>
      </div>
    </div>
    <div class="hidden w-[50px] lg:flex md:flex sm:flex xl:flex">
      <DarkToggle />
    </div>
  </div>

  <div class="h-[60px]" />

  <div
    name="v-header"
    class=" flex fixed h-0 w-full justify-end top-[60px] z-[6000] transition-all lg:hidden md:hidden sm:hidden xl:hidden dark:bg-dark bg-light"
    :class="{ 'h-full': isOpen }"
  >
    <Transition name="slide-fade">
      <ul v-if="isOpen" class="flex flex-col items-end">
        <li v-for="link in links" :key="link.href" class="h-[60px]" @click="isOpen = !isOpen">
          <NuxtLink :to="`${link.href}`" class="mobile-head-link" :prefetch="true">
            {{ link.name }}
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
