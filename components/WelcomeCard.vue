<script setup lang="ts">
const link = [
  {
    index: 0,
    name: '',
    url: 'https://github.com/lnbiuc',
    icon: 'i-ri:github-line',
  },
  {
    index: 1,
    name: '',
    url: 'https://x.com/ZZSLL_53387',
    icon: 'i-ri:twitter-x-line',
  },
  {
    index: 2,
    name: '',
    url: 'https://space.bilibili.com/1258497845',
    icon: 'i-ri:bilibili-line',
  },
  {
    index: 3,
    name: '',
    url: 'mailto:hi@lnbiuc.com',
    icon: 'i-ri:mail-line',
  },
]

function handleScroll() {
  const el = document.getElementById('featured')
  const yOffset = -80
  if (el) {
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition + yOffset

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

onMounted(() => {
  // const favicon: HTMLElement | null = document.querySelector('.favicon-shadown')
  // const yRotate = [-20, 20]
  // const xRotate = [-20, 20]
  // function getRotateDeg(range: number[], value: number, length: number) {
  //   return (value / length) * (range[1] - range[0]) + range[0]
  // }

  // if (!favicon)
  //   return
  // favicon.onmousemove = (e: any) => {
  //   const { offsetX, offsetY } = e
  //   const { offsetWidth, offsetHeight } = favicon
  //   const ry = -getRotateDeg(yRotate, offsetX, offsetWidth)
  //   const rx = getRotateDeg(xRotate, offsetY, offsetHeight)
  //   favicon.style.setProperty('--rx', `${rx}deg`)
  //   favicon.style.setProperty('--ry', `${ry}deg`)
  // }

  // favicon.onmouseleave = () => {
  //   favicon.style.setProperty('--rx', `0deg`)
  //   favicon.style.setProperty('--ry', `0deg`)
  // }
  const card: HTMLElement | null = document.querySelector('.favicon-shadown')
  const motionMatchMedia = window.matchMedia('(prefers-reduced-motion)')
  const THRESHOLD = 10
  /*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/a-3d-hover-effect-using-css-transforms
 */
  function handleHover(e: any) {
    if (!card)
      return
    const { clientX, clientY, currentTarget } = e
    const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget

    const horizontal = (clientX - offsetLeft) / clientWidth
    const vertical = (clientY - offsetTop) / clientHeight
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2)
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2)

    card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`
  }

  function resetStyles(e: any) {
    if (!card)
      return
    card.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`
  }

  if (!motionMatchMedia.matches) {
    if (!card)
      return
    card.addEventListener('mousemove', handleHover)
    card.addEventListener('mouseleave', resetStyles)
  }
})
</script>

<template>
  <div style="height: calc(100vh - 160px)" class="m-auto max-w-[1000px] w-[100%] flex flex-col items-center justify-between md:flex-row">
    <div class="flex flex-col items-start justify-start md:items-start md:justify-start">
      <h1 class="text-left text-6xl font-bold">
        Hi!👋
      </h1>
      <h1 class="mt-5 text-6xl font-bold">
        I'm <span class="text-violet text-shadow-md" style="font-family: 'MyFont', sans-serif;">violet</span>
      </h1>
      <span class="mb-2 mt-5 text-2xl">
        A Web Developer 🖥. Code for Fun.
      </span>
      <div class="my-3 flex flex-row">
        <MyButton @click="$router.push('/blog')">
          Read the Blog
        </MyButton>
        <MyButton @click="$router.push('/about')">
          About Me
        </MyButton>
      </div>
      <div class="flex flex-row">
        <a
          v-for="l in link" :key="l.index" class="my-open-tab mr-3 flex flex-row items-center justify-center" :href="l.url"
          target="_blank"
        >
          <UIcon :name="l.icon" class="text-xl" />
          <span class="ml-1">
            {{ l.name }}
          </span>
        </a>
      </div>
    </div>
    <div class="hidden transition-all md:block">
      <img v-auto-animate src="/favicon.ico" alt="logo" class="favicon-shadown h-[300px] w-[300px] rounded-full shadow-md transition-all hover:shadow-xl">
    </div>
  </div>
  <div class="h-[100px] w-full flex flex-row justify-center">
    <div class="common-shadow icon-down i-carbon-arrow-down h-[40px] w-[40px] hover:cursor-pointer" @click="handleScroll" />
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'MyFont';
  src: url('/Spacewar.ttf') format('truetype');
}

.favicon-shadown:hover {
  transform: translateZ(12px);
  transition: all 0.1s ease;
}

.dark .favicon-shadown:hover {
  transform: translateZ(12px);
  transition: all 0.1s ease;
}

.favicon-shadown {
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: all 0.1s ease;
  transform-style: preserve-3d;
}

.dark .favicon-shadown {
  transition: all 0.1s ease;
  transform-style: preserve-3d;
}

@keyframes jump {

  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(.8, 0, 1, 1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, .2, 1);
  }
}

.icon-down {
  animation: jump 1s ease-in-out infinite;
}

@media (max-width: 767px) {
  .flex-col.md\\:flex-row {
    flex-direction: column;
  }

  .md\\:items-center {
    align-items: center;
  }

  .md\\:justify-start {
    justify-content: flex-start;
  }

  .md\\:block {
    display: block;
  }

  .hidden {
    display: none;
  }
}
</style>
