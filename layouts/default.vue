<template>
  <main class="text-center">
    <Header />
    <div class="min-h-[90vh]">
      <slot name="main" />
    </div>
    <Footer />
    <div class="mx-auto mt-5 text-center text-sm opacity-25">
      <!-- [Default Layout] -->
    </div>
  </main>
</template>
