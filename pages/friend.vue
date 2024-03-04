<script setup lang="ts">
import type { IFriend } from '~/server/types'
import { useFriendStore } from '~/store/FriendStore'

const friends = ref<IFriend[]>()

const { get } = useFriendStore()

get().then((res) => {
  friends.value = res
})

useSeoMeta({
  title: 'Friend | 薇尔薇',
  ogTitle: 'Friend | 薇尔薇',
  description: '薇尔薇 is A Web Developer. Code for Fun.',
  ogDescription: '薇尔薇 is A Web Developer. Code for Fun.',
})

const colorModel = useColorMode()

defineOgImage({
  component: 'NuxtSeo',
  props: {
    title: 'Friend | 薇尔薇',
    description: '薇尔薇 is A Web Developer. Code for Fun.',
    theme: '#a78bfa',
    colorMode: () => colorModel.preference === 'dark' ? 'dark' : 'light',
  },
})

useHead({
  htmlAttrs: {
    lang: 'zh_CN',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico',
    },
  ],
})

const md = '你可以通过在下方评论来申请友链，只需满足以下条件即可，通过后博主会手动添加嗷。' + '\n'
  + '  - 国内可访问' + '\n'
  + '  - HTTPS连接' + '\n'
  + '  - 有内容，设计美观' + '\n'
  + '  - 等等' + '\n'
  + '\n'
  + '正如你所看到的这样，网站会在固定时间抓取已加入的网站的截图，大概是每三天一次。如果同意，请在评论中提供以下信息:' + '\n'
  + '  - 标题/名称' + '\n'
  + '  - 一句话的描述/简介' + '\n'
  + '  - 头像链接' + '\n'
  + '  - 网站链接' + '\n'
  + '\n'
  + '本站信息: '
  + '\n'
  + '  - 名称: 薇尔薇' + '\n'
  + '  - 描述: A Web <Developer />. Code for Fun.' + '\n'
  + '  - 头像: https://vio.vin/favicon.ico' + '\n'
  + '  - 链接: https://vio.vin' + '\n'
  + '  - 邮箱: hi@lnbiuc.com' + '\n'
  + '\n'
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div class="flex flex-row">
          <div class="text-left w-full">
            <h1 class="text-5xl text-violet font-bold">
              Friends
            </h1>
            <div class="py-4">
              <span>
                Here are some of my friends.
              </span>
            </div>
          </div>
        </div>
        <FriendCards :friends="friends!" class="mb-20" />
        <MDRender :source="md" />
        <Comment />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
