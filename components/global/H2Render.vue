<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h2)
</script>

<template>
  <h2 :id="id" class="scroll-mt-[80px] flex relative items-center left-[-25px]">
    <span class="mr-2 op50">#</span>
    <a v-if="id && generate" :href="`#${id}`" class="hover:underline">
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<style scoped>
h2 .mr-2 {
  visibility: hidden;
}

h2:hover .mr-2 {
  visibility: visible;
}
</style>
