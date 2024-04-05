<script setup lang="ts">
import type { PropType } from 'vue'
import LinkCard from '~/components/markdown/LinkCard.vue'
import { useThrottleFn } from '@vueuse/core'

const props = defineProps({
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & {}) | null | undefined>,
    default: undefined,
    required: false
  }
})

function isGithubRepoLink(link: string): boolean {
  // GitHub 仓库链接的格式为 https://github.com/username/repo
  const regex = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
  return regex.test(link);
}

const image = ref('/loading.gif')

const handleFetchImage = useThrottleFn(async () => {
  if (image.value === '/loading.gif') {
    const data = await $fetch(`/api/link/inspect?url=${props.href}`)

    image.value = data as string
  }
}, 10000)

function openLink() {
  window.open(props.href, props.target as string)
}
</script>

<template>
  <LinkCard v-if="isGithubRepoLink(props.href)" :link="href" />
  <UPopover v-else mode="hover" :popper="{ placement: 'top-start' }" @mouseover="handleFetchImage">
    <UButton icon="i-ri:external-link-line" @click="openLink" :to="props.href" :target="props.target" variant="link"
      :ui="{ padding: 'px-0' }">
      {{ props.href }}</UButton>
    <template #panel>
      <div class="h-full w-full">
        <NuxtImg :src="image" alt="popover" class="object-cover h-50 w-full" placeholder="/loading.gif" />
      </div>
    </template>
  </UPopover>

</template>
