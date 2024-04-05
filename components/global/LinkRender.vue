<script setup lang="ts">
import type { PropType } from 'vue'
import LinkCard from '~/components/markdown/LinkCard.vue'

defineProps({
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

</script>

<template>
  <LinkCard v-if="isGithubRepoLink(href)" :link="href" />

  <!-- <UPopover v-else mode="hover" id="UPopover" class="w-auto"> -->

  <NuxtLink v-else :href="href" :target="target">
    <slot />
  </NuxtLink>

  <!-- <template #panel>
      <div class="h-full w-full">
        <NuxtImg src="/favicon.ico" alt="popover" class="object-cover h-50 w-full" :placeholder="[50, 25, 75, 5]"
          format="webp" />
      </div>
    </template> -->
  <!-- </UPopover> -->
</template>
