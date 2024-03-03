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

// useSeoMeta({
//   ogImage: '/ogabout.png',
//   twitterTitle: '薇尔薇｜About',
//   twitterDescription: '薇尔薇 is A Web Developer 🖥. Code for Fun.',
//   twitterImage: '/ogabout.png',
//   twitterCard: 'summary_large_image',
// })
const colorModel = useColorMode()

defineOgImage({
  component: 'NuxtSeo',
  props: {
    title: 'About | 薇尔薇',
    description: '薇尔薇 is A Web Developer 🖥. Code for Fun.',
    theme: '#a78bfa',
    colorMode: () => colorModel.preference === 'dark' ? 'dark' : 'light',
  },
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div class="text-left flex flex-col">
          <h1 class="text-5xl text-violet font-bold">
            About
          </h1>
          <div class="py-4">
            <span>About me and this site, you can find the contact information here.</span>
          </div>
          <!-- <MdPreview :model-value="md" :theme="theme" class="preview" editor-id="about-me" /> -->
          <!-- <MDRender class="violet-prose" :source="md"/> -->
          <div class="violet-prose">
            <h1 id="violet" tabindex="-1">Violet</h1>
            <h2 id="whoami" tabindex="-1">whoami</h2>
            <p>Hello! I'm Violet. I'm a recent graduate in computer science. A Java programmer based in Xi'an. I have a
              passion for exploring everything interesting, ranging from peculiar gadgets like charger,NAS and routers.
              Additionally, I find great joy in delving into the world of frontend development. Currently residing and
              working in Xi'an, I document my professional and learning journey through work and study notes, which you
              can find on this website. Feel free to reach out and connect!</p>
            <h2 id="what-can-i-do" tabindex="-1">What can I do</h2>
            <p>As you can see, I am a programmer, I developing interesting things.</p>
            <h2 id="tech-stack" tabindex="-1">Tech Stack</h2>
            <ul>
              <li>Language: Java、JavaScript、TypeScript</li>
              <li>Framework: Spring &amp; SpringCloud、Vue、Nuxt</li>
              <li>Databases: MySQL、PostgreSQL、MongoDB</li>
              <li>Middleware: Redis、Elasticsearch、Zookeeper、Kafka、RabbitMQ、Nginx</li>
              <li>Ops: Docker、Centos、Ubuntu</li>
            </ul>
            <h2 id="contact" tabindex="-1">Contact</h2>
            <ul>
              <li><a href="mailto:hi@lnbiuc.com">Mail</a></li>
              <li><a href="https://github.com/lnbiuc">Github</a></li>
              <li><a href="https://twitter.com/ZZSLL_53387">Twitter</a></li>
              <li><a href="https://space.bilibili.com/1258497845">Bilibili</a></li>
            </ul>
          </div>
        </div>
        <Comment />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
