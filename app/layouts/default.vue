<template>
  <div class="min-h-screen bg-[#e9edf5] text-gray-900 antialiased flex flex-col selection:bg-primary-500 selection:text-white">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:inset-e-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:outline-none"
    >
      پرش به محتوای اصلی
    </a>
    <AppHeader />
    <main
      id="main-content"
      tabindex="-1"
      class="layout-container flex-1 pt-6 mx-auto"
    >
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
