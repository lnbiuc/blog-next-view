<script setup lang="ts">
import type { IFriend } from '~/server/types'
import { useFriendStore } from '~/store/FriendStore'
import { useClipboard } from '@vueuse/core'

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

const toast = useToast()

function handleCopy(text: string) {

  const sourceCopy = ref(text)

  const { copy, isSupported } = useClipboard({ source: sourceCopy })

  if (isSupported) {
    copy()
    toast.add({ title: 'Copied', description: sourceCopy.value, timeout: 3000, icon: 'i-heroicons-check-circle text-violet' })
  }
}

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
          </ul>
          <p>如果同意，请在评论中提供以下信息:</p>
          <ul>
            <li>标题/名称</li>
            <li>一句话的描述/简介</li>
            <li>头像链接</li>
            <li>网站链接</li>
          </ul>
          <p>欢迎添加本站:（点击复制）</p>
          <ul>
            <li>
              <UButton class="mr-1 text-md" variant="link" @click="handleCopy('薇尔薇')">
                名称：薇尔薇
              </UButton>
            </li>
            <li>
              <UButton class="mr-1 text-md" variant="link" @click="handleCopy('A Web Developer. Code for Fun.')">
                描述：A Web Developer. Code for Fun.
              </UButton>
            </li>
            <li>
              <UButton class="mr-1 text-md" variant="link" @click="handleCopy('https://vio.vin/favicon.ico')">
                头像：https://vio.vin/favicon.ico
              </UButton>
            </li>
            <li>
              <UButton class="mr-1 text-md" variant="link" @click="handleCopy('https://vio.vin')">
                链接：https://vio.vin
              </UButton>
            </li>
            <li>
              <UButton class="mr-1 text-md" variant="link" @click="handleCopy('hi@lnbiuc.com')">
                邮箱：hi@lnbiuc.com
              </UButton>
            </li>
          </ul>
        </div>
        <Comment />
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
