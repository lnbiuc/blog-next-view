<template>
  <h3 :id="id" class="flex items-center relative left-[-29px] scroll-mt-[80px]">
    <span class="mr-2 op50 text-base">##</span>
    <a v-if="id && generate" :href="`#${id}`" class="hover:underline">
      <slot />
    </a>
    <slot v-else />
  </h3>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h3)
</script>

<style scoped>
h3 .mr-2 {
  visibility: hidden;
}

h3:hover .mr-2 {
  visibility: visible;
}
</style>
