<script lang="ts" setup>
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

const { width, height } = useWindowSize()

const isOpen = ref(false)

const links = [{
  label: 'Home',
  to: '/'
}, {
  label: 'Blog',
  to: '/blog'
}, {
  label: 'Shorts',
  to: '/shorts'
}, {
  label: 'Project',
  to: '/project'
},{
  label: 'About',
  to: '/about'
}]
</script>

<template>
  <div :style="{ position: props.fixed ? 'fixed' : 'relative' }" class="z-1000 w-full">
    <div class="my-head overflow-hidden">
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
    </div>
  </div>
  <div v-if="props.fixed" class="h-60px w-full" />
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
  background: linear-gradient(to right, #8a2be2, rgb(106, 103, 206), #aa00ff, #7a2df3);
  background-size: 200% 200%;
  box-shadow: 0 0 150px 2px rgb(106, 103, 206);
}

@keyframes wave {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 200% 0;
  }
}

.my-head {
  backdrop-filter: saturate(180%) blur(20px);
}
</style>
