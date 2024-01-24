<script lang="ts" setup>
import { useFixedHeader } from 'vue-use-fixed-header'

const { width } = useWindowSize()

const headerRef = ref(null)
const { styles } = useFixedHeader(headerRef)

const route = useRoute()

function isExactRoute(currRoute: string) {
  return currRoute === route.path
}
</script>

<template>
  <div id="header" class="flex flex-col items-center justify-center px-5">
    <header ref="headerRef" class="Header w-full overflow-hidden xl:m-2 lg:w-[80%] md:w-full sm:w-full xl:max-w-[1100px] xl:w-[80%] xl:rounded-md" :style="styles">
      <div class="wave-animation h-[10px] w-full" />
      <div class="w-full flex flex-row items-center justify-center">
        <div class="w-[70%] flex justify-center">
          <ul class="flex flex-row py-2">
            <NuxtLink to="/" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/') }">
              Home
            </NuxtLink>
            <NuxtLink to="/blog" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/blog') }">
              Blog
            </NuxtLink>
            <NuxtLink to="/shorts" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/shorts') }">
              Shorts
            </NuxtLink>
            <NuxtLink to="/project" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/project') }">
              Project
            </NuxtLink>
            <NuxtLink to="/about" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/about') }">
              About
            </NuxtLink>
          </ul>
        </div>
        <div
          v-if="width > 767"
          class="w-[30%] flex justify-center"
        >
          <DarkToggle />
          <!-- <UColorModeButton /> -->
        </div>
      </div>
    </header>
  </div>

  <div class="h-60px w-full" />
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
  backdrop-filter: saturate(180%) blur(20px);
}
</style>
