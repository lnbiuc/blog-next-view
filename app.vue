<script lang="ts" setup>
import '~/styles/main.css'

function handleToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const isScroll = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScroll.value = window.scrollY > window.innerHeight / 2
  })
})

// useColorMode().value = 'dark'
</script>

<template>
  <div>
    <div class="opacity-20 h-full w-full z-0" />
    <Header />
    <div class="relative z-10">
      <NuxtPage />
    </div>
    <Footer />
    <UNotifications class="b-0 w-[300px] z-2000" />
    <Transition name="fade">
      <div v-if="isScroll" class="flex flex-row fixed justify-end bottom-4 right-4 z-1000">
        <div
          class="bg-violet rounded-full flex flex-row h-35px w-35px justify-center items-center transition-all duration-150 hover:bg-violet-500 active:scale-90 hover:scale-110"
          @click="handleToTop"
        >
          <div class="i-carbon-chevron-up" />
        </div>
      </div>
    </Transition>
  </div>
</template>
