<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'A blog for sharing knowledge',
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: 'blog, knowledge, share',
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: appName,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: 'A blog for sharing knowledge',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: 'https://vio.vin/favicon.ico',
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://vio.vin',
    },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content: appName,
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website',
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary',
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: appName,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: 'A blog for sharing knowledge',
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: 'https://vio.vin/favicon.ico',
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: 'https://vio.vin',
    },
  ],
})
</script>

<template>
  <div>
    <VitePwaManifest />
    <div class="main-bg z-0 h-full w-full opacity-20" />
    <div class="relative z-10">
      <NuxtPage />
    </div>
    <UNotifications class="w-[300px]" />
  </div>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #0E1111;
  color: #C9D1D9;
}

.main-bg {
  position: fixed;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1049%26quot%3b)' fill='none'%3e%3cpath d='M1294.88 496.8 a119.9 119.9 0 1 0 239.8 0 a119.9 119.9 0 1 0 -239.8 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M525.27 376.38 a117.11 117.11 0 1 0 234.22 0 a117.11 117.11 0 1 0 -234.22 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M787.44 191.98 a165.28 165.28 0 1 0 330.56 0 a165.28 165.28 0 1 0 -330.56 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M266.05 202.1 a115.4 115.4 0 1 0 230.8 0 a115.4 115.4 0 1 0 -230.8 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M21.61 163.07 a107.41 107.41 0 1 0 214.82 0 a107.41 107.41 0 1 0 -214.82 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1031.36 20.49 a113.34 113.34 0 1 0 226.68 0 a113.34 113.34 0 1 0 -226.68 0z' fill='rgba(138%2c 99%2c 255%2c 0.24)' class='triangle-float2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1049'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");  background-position: center;
  background-size: cover;
}

.md-editor-preview-wrapper {
  padding: 0 !important;
}

.md-editor-catalog-link span:hover, .md-editor-catalog-active>span {
  color: #A78BFA !important;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.header-transition-enter-active,
.header-transition-leave-active {
  transition: all 1000ms;
}

.header-transition-enter,
.header-transition-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
