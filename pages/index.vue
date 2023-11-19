<script setup lang="ts">
const online = useOnline()
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <div>
        <Suspense>
          <ClientOnly>
            <div v-if="!online" text-gray:80>
              You're offline
            </div>
          </ClientOnly>
          <template #fallback>
            <div italic op50>
              <span animate-pulse>Loading...</span>
            </div>
          </template>
        </Suspense>
        <!-- <div class="min-h-[1000px] w-full">
      <h1>index</h1>
    </div> -->
        <WelcomeCard />
      </div>
    </NuxtLayout>
  </div>
</template>
