<template>
  <div>
    <NuxtLayout name="default">
      <NuxtLayout name="home">
        <div class="text-left flex flex-col">
          <h1 class="text-5xl text-violet font-bold">
            <slot name="title"/>
          </h1>
          <div class="py-4">
            <span>
              <slot name="description"/>
            </span>
          </div>
        </div>
        <div class="text-left">
          <slot />
        </div>
      </NuxtLayout>
    </NuxtLayout>
  </div>
</template>
