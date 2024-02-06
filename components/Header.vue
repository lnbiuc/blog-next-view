<script lang="ts" setup>
// import { useFixedHeader } from 'vue-use-fixed-header'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

const width = ref(1200)

const isOpen = ref(true)
const route = useRoute()
function currRouter(path: string): boolean {
  return route.path === path
}

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
              'justify-around items-center h-60px': width > 767,
              'h-full': !isOpen,
    }"
    class="fixed z-1000 h-60px w-full flex flex-row border-b border-transparent bg-white bg-opacity-50 backdrop-blur-md transition-all dark:bg-dark dark:bg-opacity-0"
  >
    <div class="h-60px flex flex-row items-center">
      <!-- {{ width }} -->
      <img src="/favicon.ico" class="ml-4 h-40px w-40px transition-all active:scale-95 hover:scale-105" @click="$router.push('/')">
    </div>
    <div
      :class="{ 'flex justify-center': width > 767, 'flex justify-end': !isOpen }"
      class="hidden"
    >
      <ul
        class="round h-35px flex flex-row items-center rounded-full ring-1 ring-transparent ring-inset transition-all"
        :class="{ 'flex-col w-full': width < 767,
                  'flex-row': width > 767,
                  'items-start mt-60px mr-4': !isOpen,
                  'ring-[#ccc] dark:ring-[#333] shadow nav-shadow ': y < 80 && width > 767,
        }"
      >
        <li :class="{ 'h-50px text-2xl': !isOpen }">
          <router-link to="/" class="header-link" :class="{ 'text-violet': currRouter('/') }" @click="isOpen = true">
            Home
          </router-link>
        </li>
        <li :class="{ 'h-50px text-2xl': !isOpen }">
          <router-link to="/blog" class="header-link" :class="{ 'text-violet': currRouter('/blog') }" @click="isOpen = true">
            Blog
          </router-link>
        </li>
        <li :class="{ 'h-50px text-2xl': !isOpen }">
          <router-link to="/shorts" class="header-link" :class="{ 'text-violet': currRouter('/shorts') }" @click="isOpen = true">
            Short
          </router-link>
        </li>
        <li :class="{ 'h-50px text-2xl': !isOpen }">
          <router-link to="/project" class="header-link" :class="{ 'text-violet': currRouter('/project') }" @click="isOpen = true">
            Project
          </router-link>
        </li>
        <li :class="{ 'h-50px text-2xl': !isOpen }">
          <router-link to="/about" class="header-link" :class="{ 'text-violet': currRouter('/about') }" @click="isOpen = true">
            About
          </router-link>
        </li>
        <li :class="{ 'h-50px text-2xl flex w-full flex-row items-center justify-center': !isOpen }" class="hidden">
          <DarkToggle @click="isOpen = true" />
        </li>
      </ul>
    </div>
    <div>
      <DarkToggle :class="{ 'flex ': width > 767 }" class="hidden" />
      <div
        :class="{ 'flex': width < 767,
                  'i-ri:menu-fill scale-150': isOpen,
                  'i-ri:close-fill scale-180': !isOpen }"
        class="mr-4 hidden h-60px flex-row items-center"
        @click="isOpen = !isOpen"
      />
    </div>
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
  width: 100%;
  z-index: 1000;
  align-items: center;
}

.nav-shadow {

}
</style>
