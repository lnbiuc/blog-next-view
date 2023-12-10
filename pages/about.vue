<script setup lang="ts">
import 'md-editor-v3/lib/preview.css'
import { MdPreview } from 'md-editor-v3'
import MyGiscus from '~/components/Giscus/MyGiscus.vue'

const md = '# Violet\n' +
    '\n' +
    '## whoami\n' +
    '\n' +
    'Hello! I\'m Violet. I\'m a recent graduate in computer science. A Java programmer based in Xi\'an. I have a passion for exploring everything interesting, ranging from peculiar gadgets like charger,NAS and routers. Additionally, I find great joy in delving into the world of frontend development. Currently residing and working in Xi\'an, I document my professional and learning journey through work and study notes, which you can find on this website. Feel free to reach out and connect!\n' +
    '\n' +
    '## What can I do\n' +
    '\n' +
    'As you can see, I am a programmer, I developing interesting things.\n' +
    '\n' +
    '## Tech Stack\n' +
    '\n' +
    '- Language: Java、JavaScript、TypeScript\n' +
    '- Framework: Spring & SpringCloud、Vue、Nuxt\n' +
    '- Databases: MySQL、PostgreSQL、MongoDB\n' +
    '- Middleware: Redis、Elasticsearch、Zookeeper、Kafka、RabbitMQ、Nginx\n' +
    '- Ops: Docker、Centos、Ubuntu\n' +
    '\n' +
    '## Contact\n' +
    '\n' +
    '- [Mail](mailto:hi@lnbiuc.com)\n' +
    '- [Github](https://github.com/lnbiuc)\n' +
    '- [Twitter](https://twitter.com/ZZSLL_53387)\n' +
    '- [Bilibili](https://space.bilibili.com/1258497845)'
const color = useColorMode()

const theme = ref<'dark' | 'light'>(color.preference === 'dark' ? 'dark' : 'light')

watch(toRef(color).value, () => {
  theme.value = color.preference === 'dark' ? 'dark' : 'light'
})

useHead({
  title: 'About',
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div class="flex flex-col text-left">
          <h1 class="text-5xl font-bold text-violet">
            About
          </h1>
          <div class="py-4">
            <span>Introduction and Contact Information: Feel free to leave messages here to get in touch with me.</span>
          </div>
          <MdPreview editor-id="about-me" class="preview" :model-value="md" :theme="theme" />
        </div>
        <MyGiscus
          class="mt-4 py-4"
          repo="lnbiuc/blog-next-view"
          repo-id="R_kgDOKsLYcQ"
          category="Announcements"
          category-id="DIC_kwDOKsLYcc4CbAW9"
          mapping="pathname"
          term="Welcome to @giscus/vue component!"
          strict="1"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="top"
          :theme="color.preference"
          lang="en"
          crossorigin="anonymous"
        />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.md-editor-dark, .md-editor {
  --md-bk-color: transparent !important;
}

.md-editor-preview-wrapper {
  padding: 0 !important;
}

.md-editor-catalog-link span:hover, .md-editor-catalog-active>span {
  color: #A78BFA !important;
}

.preview>>>ul {
  list-style-type: disc;
  /* 默认值，圆点 */
}

.preview>>>ol {
  list-style-type: decimal;
  /* 默认值，数字 */
}
</style>
