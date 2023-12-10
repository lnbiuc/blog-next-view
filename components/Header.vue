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
            <NuxtLink class="header-link" to="/">Home
            </NuxtLink>
            <NuxtLink class="header-link" to="/blog">Blog
            </NuxtLink>
            <NuxtLink class="header-link" to="/shorts">
              Shorts</NuxtLink>
            <NuxtLink class="header-link" to="/project">
              Project</NuxtLink>
            <NuxtLink class="header-link" to="/about">
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
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.wave-animation {
  background: linear-gradient(to right, #8a2be2, rgb(106, 103, 206), #aa00ff, #7a2df3, #2be22b);
  background-size: 200% 200%;
  animation: gradientAnimation 10s ease infinite;
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
