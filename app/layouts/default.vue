<template>
  <div class="min-h-screen bg-[#e9edf5] text-gray-900 antialiased flex flex-col selection:bg-primary-500 selection:text-white">
    <AppHeader />
    <main class="layout-container flex-1 pt-6 mx-auto">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
