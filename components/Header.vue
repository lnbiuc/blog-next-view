<script lang="ts" setup>
import { useFixedHeader } from 'vue-use-fixed-header'

const { width } = useWindowSize()

const headerRef = ref(null)
const { styles } = useFixedHeader(headerRef)

const route = useRoute()

function isExactRoute(currRoute: string) {
  return currRoute === route.path
}

const isOpen = ref(false)

const hidden = ref(false)

watchEffect(() => {
  if (width.value < 767)
    hidden.value = false
  else
    hidden.value = true
})
</script>

<template>
  <div id="header" class="flex flex-col items-center justify-center px-5">
    <header ref="headerRef" class="Header w-full overflow-hidden lg:w-[80%] md:w-full sm:w-full xl:max-w-[1000px] xl:w-[80%] xl:rounded-md xl:pt-2" :style="styles">
      <div class="wave-animation h-[10px] w-full rounded-lt rounded-rt" />
      <div class="h-[50px] w-full flex flex-row items-center justify-center" style="backdrop-filter: saturate(180%) blur(20px);">
        <div class="w-[70%] flex" :class="{ 'justify-center': hidden, 'justify-start': !hidden }">
          <ul v-if="hidden" class="flex flex-row py-2">
            <li>
              <NuxtLink to="/" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/') }">
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/blog') }">
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shorts" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/shorts') }">
                Shorts
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/project" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/project') }">
                Project
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/about') }">
                About
              </NuxtLink>
            </li>
          </ul>
          <div v-else class="text-2xl text-violet font-700 text-shadow-md" style="font-family: 'MyFont', sans-serif;" @click="$router.push('/')">
            violet
          </div>
        </div>
        <div
          v-if="hidden"
          class="w-[30%] flex justify-center"
        >
          <DarkToggle />
        </div>
        <div v-else>
          <div class="i-ri:menu-line" @click="isOpen = !isOpen" />
        </div>
      </div>
    </header>
  </div>
  <USlideover
    v-model="isOpen" class="z-1000 transition-all" side="right" :ui="{
      width: 'w-150px max-w-[150px]',
    }"
  >
    <UCard class="flex flex-col">
      <template #header>
        <Placeholder class="h-10" />
      </template>
      <div class="">
        <ul>
          <li class="my-4">
            <NuxtLink to="/" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/') }" @click="isOpen = !isOpen">
              Home
            </NuxtLink>
          </li>
          <li class="my-4">
            <NuxtLink to="/blog" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/blog') }" @click="isOpen = !isOpen">
              Blog
            </NuxtLink>
          </li>
          <li class="my-4">
            <NuxtLink to="/shorts" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/shorts') }" @click="isOpen = !isOpen">
              Shorts
            </NuxtLink>
          </li>
          <li class="my-4">
            <NuxtLink to="/project" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/project') }" @click="isOpen = !isOpen">
              Project
            </NuxtLink>
          </li>
          <li class="my-4">
            <NuxtLink to="/about" class="link-hover header-link" :class="{ 'text-violet link-active': isExactRoute('/about') }" @click="isOpen = !isOpen">
              About
            </NuxtLink>
          </li>
          <li class="my-4 ml-6 scale-120">
            <DarkToggle />
          </li>
        </ul>
      </div>
    </UCard>
  </USlideover>
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
}
</style>
