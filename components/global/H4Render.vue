<template>
  <h4 :id="id" class="scroll-mt-[80px]">
    <a v-if="id && generate" :href="`#${id}`" class="hover:underline">
      <slot />
    </a>
    <slot v-else />
  </h4>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && headings?.anchorLinks?.h4)
</script>
