<script setup lang="ts">
const colorMode = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => colorMode.preference === 'dark' ? '#222222' : '#E6EDF3',
  }],
})

const themes = ['light', 'dark', 'system']

function toggleDark() {
  colorMode.preference = themes[(themes.indexOf(colorMode.preference) + 1) % themes.length]
}

const isDark = computed(() => colorMode.preference === 'dark')

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
function useToggleDark(event: MouseEvent) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    toggleDark()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    toggleDark()
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}

const icon = ref()

watchEffect(() => {
  if (colorMode.preference == 'dark') {
    icon.value = 'i-ri:moon-foggy-fill'
  } else if (colorMode.preference == 'light') {
    icon.value = 'i-ri:sun-foggy-fill'
  } else {
    icon.value = 'i-ri:contrast-line'
  }


})
</script>

<template>
  <UButton @click="useToggleDark" color="white" size="lg" square>
    <template #trailing>
      <UIcon :name="icon" class="w-5 h-5" />
    </template>
  </UButton>
</template>
