<script lang="ts" setup>
const colorMode = useColorMode()
</script>

<template>
  <div class="mt-2 flex flex-col justify-center items-start">
    <a v-if="colorMode.value === 'dark'" :key="colorMode.value" href="https://zeabur.com?referralCode=lnbiuc&utm_source=lnbiuc"><img
      src="https://zeabur.com/deployed-on-zeabur-dark.svg" alt="Deployed on Zeabur"
    ></a>
    <a v-if="colorMode.value === 'light'" :key="colorMode.value" class="shadow-md" href="https://zeabur.com?referralCode=lnbiuc&utm_source=lnbiuc"><img
      src="https://zeabur.com/deployed-on-zeabur-light.svg" alt="Deployed on Zeabur"
    ></a>
  </div>
</template>
