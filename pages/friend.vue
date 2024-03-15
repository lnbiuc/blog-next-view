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
        <!-- <MDRender :source="md" /> -->
        <div class="text-left violet-prose">
          <p>你可以通过在下方评论来申请友链，只需满足以下条件即可，通过后博主会手动添加嗷。</p>
          <ul>
            <li>国内可访问</li>
            <li>HTTPS连接</li>
            <li>有内容，设计美观</li>
            <li>等等</li>
          </ul>
          <p>正如你所看到的这样，网站会在固定时间抓取已加入的网站的截图，大概是每三天一次。如果同意，请在评论中提供以下信息:</p>
          <ul>
            <li>标题/名称</li>
            <li>一句话的描述/简介</li>
            <li>头像链接</li>
            <li>网站链接</li>
          </ul>
          <p>本站信息:</p>
          <ul>
            <li>名称: 薇尔薇</li>
            <li>描述: A Web Developer. Code for Fun.
            </li>
            <li>头像: <a href="https://vio.vin/favicon.ico" target="_blank"
                name="violet-link-inspect">https://vio.vin/favicon.ico</a></li>
            <li>链接: <a href="https://vio.vin" target="_blank" name="violet-link-inspect">https://vio.vin</a></li>
            <li>邮箱: <a href="mailto:hi@lnbiuc.com" target="_blank" name="violet-link-inspect">hi@lnbiuc.com</a></li>
          </ul>
        </div>
        <Comment />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
