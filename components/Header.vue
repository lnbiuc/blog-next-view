<script setup lang="ts">

</script>

<template>
  <div class="z-50 w-full">
    <div class="wave-animation h-[10px] w-full" />
    <div class="flex flex-row items-center justify-center">
      <div class="w-[70%] flex justify-center">
        <ul class="flex flex-row py-2">
          <li class="px-4 py-2 transition-transform duration-150 hover:cursor-default hover:text-violet" @click="$router.push('/')">
            Home
          </li>
          <li class="px-4 py-2 transition-transform duration-150 hover:cursor-default hover:text-violet" @click="$router.push('/blog')">
            Blog
          </li>
          <li class="px-4 py-2 transition-transform duration-150 hover:cursor-default hover:text-violet" @click="$router.push('/shorts')">
            Shorts
          </li>
          <li class="px-4 py-2 transition-transform duration-150 hover:cursor-default hover:text-violet" @click="$router.push('/project')">
            Project
          </li>
          <li class="px-4 py-2 transition-transform duration-150 hover:cursor-default hover:text-violet" @click="$router.push('/about')">
            About
          </li>
        </ul>
      </div>
      <div class="w-[30%] flex justify-start">
        <DarkToggle />
      </div>
    </div>
  </div>
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
</style>
