<script setup lang="ts">
import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo'
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})

</script>

<template>
  <NuxtImg
    :src="props.src" :alt="props.alt" width="100%" :placeholder="[50, 25, 75, 5]" format="webp" loading="lazy"
    class="my-2 op75 rounded shadow transition-all animated animated-fade-in-up-big hover:op100 hover:shadow-md"
  />
</template>
