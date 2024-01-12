<script lang="ts" setup>
import { useFixedHeader } from 'vue-use-fixed-header'

const { width, height } = useWindowSize()

const headerRef = ref(null)
const { styles } = useFixedHeader(headerRef)
</script>

<template>
  <header ref="headerRef" class="Header" :style="styles">
    <div class="wave-animation h-[10px] w-full" />
    <div class="flex flex-row items-center justify-center">
      <div class="w-[70%] flex justify-center">
        <ul class="flex flex-row py-2">
          <NuxtLink class="header-link" to="/">
            Home
          </NuxtLink>
          <NuxtLink class="header-link" to="/blog">
            Blog
          </NuxtLink>
          <NuxtLink class="header-link" to="/shorts">
            Shorts
          </NuxtLink>
          <NuxtLink class="header-link" to="/project">
            Project
          </NuxtLink>
          <NuxtLink class="header-link" to="/about">
            About
          </NuxtLink>
        </ul>
      </div>
      <div v-if="width > 767" class="w-[30%] flex justify-start">
        <DarkToggle />
      </div>
    </div>
  </header>
  <div class="h-60px w-full" />
</template>

<style scoped>
.wave-animation {
  background: linear-gradient(to right, #8a2be2, rgb(106, 103, 206), #aa00ff, #7a2df3);
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
