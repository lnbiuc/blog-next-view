<script setup lang="ts">
import 'animate.css'

const fixed = ref<boolean>(false)

const up = ref<boolean>(false)
onMounted(() => {
  let prevScrollY = window.scrollY
  let totalScrollDown = 0
  let totalScrollUp = 0

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY
    const scrollDistance = Math.abs(currentScrollY - prevScrollY)
    if (currentScrollY > prevScrollY) {
      totalScrollUp = 0
      totalScrollDown += scrollDistance
      if (totalScrollDown > window.innerHeight / 2) {
        fixed.value = false
        up.value = true
      }
    }
    else if (currentScrollY < prevScrollY) {
      totalScrollDown = 0
      totalScrollUp += scrollDistance
      if (totalScrollUp > window.innerHeight / 2) {
        fixed.value = true
        up.value = false
      }
    }

    prevScrollY = currentScrollY
  })
})
</script>

<template>
  <div>
    <main class="w-full px-4">
      <slot />
      <!-- <div class="mx-auto mt-5 text-center text-sm opacity-25">
        [Default Layout]
      </div> -->
    </main>
  </div>
</template>
