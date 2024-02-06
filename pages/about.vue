<script lang="ts" setup>
import MyGiscus from '~/components/Giscus/MyGiscus.vue'

// import '~/styles/markdown.css'
// import '~/styles/prose.css'

const md = '# Violet\n'
  + '\n'
  + '## whoami\n'
  + '\n'
  + 'Hello! I\'m Violet. I\'m a recent graduate in computer science. A Java programmer based in Xi\'an. I have a passion for exploring everything interesting, ranging from peculiar gadgets like charger,NAS and routers. Additionally, I find great joy in delving into the world of frontend development. Currently residing and working in Xi\'an, I document my professional and learning journey through work and study notes, which you can find on this website. Feel free to reach out and connect!\n'
  + '\n'
  + '## What can I do\n'
  + '\n'
  + 'As you can see, I am a programmer, I developing interesting things.\n'
  + '\n'
  + '## Tech Stack\n'
  + '\n'
  + '- Language: Java、JavaScript、TypeScript\n'
  + '- Framework: Spring & SpringCloud、Vue、Nuxt\n'
  + '- Databases: MySQL、PostgreSQL、MongoDB\n'
  + '- Middleware: Redis、Elasticsearch、Zookeeper、Kafka、RabbitMQ、Nginx\n'
  + '- Ops: Docker、Centos、Ubuntu\n'
  + '\n'
  + '## Contact\n'
  + '\n'
  + '- [Mail](mailto:hi@lnbiuc.com)\n'
  + '- [Github](https://github.com/lnbiuc)\n'
  + '- [Twitter](https://twitter.com/ZZSLL_53387)\n'
  + '- [Bilibili](https://space.bilibili.com/1258497845)'

const colorMode = useColorMode()

const theme = computed(() => {
  return colorMode.value === 'dark' ? 'dark' : 'light'
})

useSeoMeta({
  ogImage: '/ogabout.png',
  twitterTitle: '薇尔薇｜About',
  twitterDescription: '薇尔薇 is A Web Developer 🖥. Code for Fun.',
  twitterImage: '/ogabout.png',
  twitterCard: 'summary_large_image',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div class="flex flex-col text-left">
          <h1 class="text-5xl text-violet font-bold">
            About
          </h1>
          <div class="py-4">
            <span>About me and this site, you can find the contact information here.</span>
          </div>
          <!-- <MdPreview :model-value="md" :theme="theme" class="preview" editor-id="about-me" /> -->
          <MDRender class="violet-prose" :source="md" />
        </div>
        <MyGiscus
          :theme="theme"
          category="Announcements"
          category-id="DIC_kwDOKsLYcc4CbAW9"
          class="mt-4 py-4"
          crossorigin="anonymous"
          emit-metadata="0"
          input-position="bottom"
          lang="en"
          mapping="pathname"
          reactions-enabled="1"
          repo="lnbiuc/blog-next-view"
          repo-id="R_kgDOKsLYcQ"
          strict="1"
          term="Welcome to @giscus/vue component!"
        />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
