<script setup lang="ts">
import type { IArticle } from "~/server/types";

const props = defineProps({
  pageData: {
    type: Object as PropType<IArticle>,
    required: true,
  },
});
</script>

<template>
  
</template>
