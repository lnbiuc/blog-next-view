<!-- components/content/Card.vue -->
<script setup>
defineProps(['color'])
</script>
<template>
  <div class="py-2">
    <UAlert :color="color" variant="soft" :ui="{ title: 'text-2xl leading-0', description: 'text-base' }">
      <template #title>
        <slot />
      </template>

      <template #description>
        <slot name="desc" />
      </template>
    </UAlert>
  </div>
</template>
