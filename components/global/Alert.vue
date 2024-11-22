<!-- components/content/Card.vue -->
<script setup>
defineProps(['color'])
</script>

<template>
  <div class="py-2">
    <UAlert :color="color" variant="soft" :ui="{ title: 'leading-0', description: 'text-base' }">
      <template #description>
        <p><slot /> : <slot name="desc" /></p>
      </template>
    </UAlert>
  </div>
</template>
