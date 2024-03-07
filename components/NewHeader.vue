<script setup lang="ts">
import { useFixedHeader } from 'vue-use-fixed-header'
import { useWindowScroll } from '@vueuse/core'
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'


const headerRef = ref(null)
const width = ref(1200)
const { y } = useWindowScroll()
const route = useRoute()
const showTitleY = ref(60)


const isPricingPage = computed(() => (!route.path.includes('/article')) || y.value < showTitleY.value)

const { styles } = useFixedHeader(headerRef, {
  watch: isPricingPage, // Will perform a check everytime the value changes
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
    else { showTitleY.value = 100 }
  }

  else { isArticlePage.value = false }
})

</script>

<template>
  <div class="w-full flex flex-row justify-around items-center h-60px fixed">
    <div>
      <img src="/site-favicon.ico" class="w-50px h-50px object-cover" />
    </div>
    <div
      class="flex flex-row justify-between items-center w-full lg:w-[80%] md:w-full sm:w-full xl:max-w-[1000px] xl:w-[80%]">
      <div name="title">
        <p class="text-xl font-semibold text-ellipsis overflow-hidden">
          {{ article?.title }}
        </p>
        <p class="text-xs text-gray-500 text-ellipsis overflow-hidden">
          {{ article?.category }} / {{ article?.shortLink }}
        </p>
      </div>

      <div name="header">
        <header v-if="width > 767" ref="headerRef" class="Header flex flex-row justify-center bg-violet max-w-1000px"
          :style="{
            ...styles,
            position: isPricingPage ? 'relative' : 'fixed',
          }">
          header
        </header>
        <div>
          fix header
        </div>
      </div>

      <div name="rate">
        100
      </div>
    </div>
    <div class="w-50px">
      <DarkToggle />
    </div>
  </div>
  <div class="h-60px"></div>
</template>

<style scoped>
.Header {
  position: fixed;
  /* or sticky */
  top: 0;
  z-index: 1000;
  align-items: center;
  text-align: center;
  margin: auto;
}
</style>
