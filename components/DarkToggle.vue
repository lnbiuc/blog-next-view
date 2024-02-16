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
</script>

<template>
  <div class="!outline-none" @click="useToggleDark">
    <div class="scale-120" :class="{ 'i-ri:sun-foggy-fill dark:i-ri:moon-foggy-fill': colorMode.preference !== 'system', 'i-ri:contrast-line': colorMode.preference === 'system' }" />
  </div>
</template>
