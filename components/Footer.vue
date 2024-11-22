<script setup lang="ts">
const umami = ref({
  pv: 0,
  uv: 0,
})

onMounted(async () => {
  await useFetch('/api/umami/stats').then((res) => {
    umami.value.pv = res.data.value.pageviews.value
    umami.value.uv = res.data.value.visitors.value
  })
})
</script>

<template>
  <div
    class="backdrop-blur-md p-4 mt-20 border-t border-t-[#eee] flex flex-col w-full justify-center items-center dark:border-t-[#222] text-xs text-gray-400"
  >
    <div
      class="flex flex-col w-full justify-between items-center lg:flex-row md:flex-row sm:flex-row xl:flex-row lg:w-[80%] md:w-full sm:w-full xl:max-w-[1000px] xl:w-[80%]"
    >
      <div>
        <span>Total PV : </span>
        <span class="text-violet">{{ umami.pv }}</span>
        <span class="mx-1">&nbsp;</span>
        <span>UV : </span>
        <span class="text-violet">{{ umami.uv }}</span>
      </div>
      <div>
        <span>Copyright © 2024</span>
        <span class="mx-1">&nbsp;</span>
        <a href="https://beian.miit.gov.cn/" target="_blank">陕ICP备2021015553号-2</a>
      </div>
    </div>
  </div>
</template>
