<script setup lang="ts">
const link = [
  {
    index: 0,
    name: '',
    url: 'https://github.com/lnbiuc',
    icon: 'i-ri:github-line',
  },
  {
    index: 1,
    name: '',
    url: 'https://x.com/ZZSLL_53387',
    icon: 'i-ri:twitter-x-line',
  },
  {
    index: 2,
    name: '',
    url: 'https://space.bilibili.com/1258497845',
    icon: 'i-ri:bilibili-line',
  },
  {
    index: 3,
    name: '',
    url: 'mailto:hi@lnbiuc.com',
    icon: 'i-ri:mail-line',
  },
]

const colorMode = useColorMode()
</script>

<template>
  <div id="footer"
    class="mt-20 flex flex-col w-full justify-center items-center backdrop-blur-md border-t border-t-gray-300 dark:border-t-gray-700">
    <div text="xs gray4"
      class="p-5  flex flex-row h-[120px] w-full overflow-hidden justify-between items-start xl:m-2  lg:w-[80%] md:w-full sm:w-full xl:max-w-[1000px] xl:w-[80%]">
      <div class="flex flex-col items-start">
        <div>
          <span>Copyright © 2024</span>
          <span class="mx-1">|</span>
          <a href="https://beian.miit.gov.cn/" target="_blank">陕ICP备2021015553号-1</a>
        </div>
        <div class="mt-10">
          <ul class="flex flex-row">
            <li>
              <router-link to="/" class="mr-2 hover:text-violet">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/blog" class="mr-2 hover:text-violet">
                Blog
              </router-link>
            </li>
            <li>
              <router-link to="/shorts" class="mr-2 hover:text-violet">
                Short
              </router-link>
            </li>
            <li>
              <router-link to="/project" class="mr-2 hover:text-violet">
                Project
              </router-link>
            </li>
            <li>
              <router-link to="/friend" class="mr-2 hover:text-violet">
                Friend
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="hover:text-violet">
                About
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <div class="flex flex-row">
          <a v-for="l in link" :key="l.index" class="my-open-tab mr-3 flex flex-row justify-center items-center"
            :href="l.url" target="_blank" aria-label="icon">
            <UIcon :name="l.icon" class="text-xl" />
            <span class="ml-1">
              {{ l.name }}
            </span>
          </a>
        </div>
        <div class="mt-6">
          <a v-if="colorMode.value === 'dark'" href="https://zeabur.com?referralCode=lnbiuc&utm_source=lnbiuc"><img
              src=https://zeabur.com/deployed-on-zeabur-dark.svg alt="Deployed on Zeabur" /></a>
          <a v-else class="shadow" href="https://zeabur.com?referralCode=lnbiuc&utm_source=lnbiuc"><img
              src=https://zeabur.com/deployed-on-zeabur-light.svg alt="Deployed on Zeabur" /></a>
        </div>
      </div>
    </div>
  </div>
</template>
