<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h3)
</script>

<template>
  <h3 :id="id" class="scroll-mt-[80px] flex relative items-center left-[-29px]">
    <span class="mr-2 op50 text-base">##</span>
    <a v-if="id && generate" :href="`#${id}`" class="hover:underline">
      <slot />
    </a>
    <slot v-else />
  </h3>
</template>

<style scoped>
h3 .mr-2 {
  visibility: hidden;
}

h3:hover .mr-2 {
  visibility: visible;
}
</style>
