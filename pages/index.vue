<script setup lang="ts">
import type { Article } from '~/server/types/article'
import { useArticleApiStore } from '~/store'

const online = useOnline()

const data = ref({
  featuredArticles: [] as Article[],
  featuredShort: [] as Article[],
  featuredProject: [] as Article[],
})

const loadingFinish = ref(false)

const { indexData, hasIndexData, getIndexData } = useArticleApiStore()

function getHomeData() {
  if (hasIndexData)
    loadingFinish.value = true

  else
    getIndexData()

  data.value = indexData
}

getHomeData()
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <div>
        <Suspense>
          <ClientOnly>
            <div v-if="!online" text-gray:80>
              You're offline
            </div>
          </ClientOnly>
          <template #fallback>
            <div italic op50>
              <span animate-pulse>Loading...</span>
            </div>
          </template>
        </Suspense>
        <WelcomeCard />
        <NuxtLayout name="home">
          <div v-if="loadingFinish" id="featured">
            <div class="title-font">
              Featured Article
            </div>
            <BlogCards :articles="data.featuredArticles" />
            <div class="title-btn">
              <MyButton @click="$router.push('/blog')">
                See More
              </MyButton>
            </div>
            <div class="title-font">
              Featured Short
            </div>
            <ShortCards :articles="data.featuredShort" />
            <div class="title-btn">
              <MyButton @click="$router.push('/shorts')">
                See More
              </MyButton>
            </div>
            <div class="title-font">
              Featured Project
            </div>
            <ProjectCards :articles="data.featuredProject" />
            <div class="title-btn">
              <MyButton @click="$router.push('/project')">
                See More
              </MyButton>
            </div>
          </div>
        </NuxtLayout>
      </div>
    </NuxtLayout>
  </div>
</template>
