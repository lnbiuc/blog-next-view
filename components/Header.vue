<script setup lang="ts">
import 'animate.css'

const props = defineProps({
  fixed: {
    type: Boolean,
    required: false,
    default: true,
  },
  up: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <div :style="{ position: props.fixed ? 'fixed' : 'relative' }" class="w-full z-1000">
    <div class="my-head">
      <div class="wave-animation h-[10px] w-full" />
      <div class="flex flex-row items-center justify-center">
        <div class="w-[70%] flex justify-center">
          <ul class="flex flex-row py-2">
            <NuxtLink class="px-4 py-2 transition-all duration-150 hover:cursor-default hover:text-violet" to="/">Home
            </NuxtLink>
            <NuxtLink class="px-4 py-2 transition-all duration-150 hover:cursor-default hover:text-violet" to="/blog">Blog
            </NuxtLink>
            <NuxtLink class="px-4 py-2 transition-all duration-150 hover:cursor-default hover:text-violet" to="/shorts">
              Shorts</NuxtLink>
            <NuxtLink class="px-4 py-2 transition-all duration-150 hover:cursor-default hover:text-violet" to="/project">
              Project</NuxtLink>
            <NuxtLink class="px-4 py-2 transition-all duration-150 hover:cursor-default hover:text-violet" to="/about">
              About</NuxtLink>
          </ul>
        </div>
        <div class="w-[30%] flex justify-start">
          <DarkToggle />
        </div>
      </div>
    </div>
  </div>
  <div class="h-60px w-full" v-if="props.fixed" />
</template>

<style scoped>
.wave-animation {
  background: linear-gradient(to right, #8a2be2, rgb(106, 103, 206), #aa00ff);
  animation: wave 1s linear infinite;
}

@keyframes wave {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 100% 0;
  }
}

.my-head {
  border-bottom: 1px solid hsla(0, 0%, 73%, .2);
  backdrop-filter: saturate(180%) blur(20px);
}
</style>
