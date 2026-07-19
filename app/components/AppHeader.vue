<script setup lang="ts">
const route = useRoute()

const links: HeaderMenuLink[] = [
  { label: 'لیست محصولات', to: '/products', icon: 'i-custom-products' },
  { label: 'دریافت مشاوره', to: '#', icon: 'i-custom-consultation' },
  { label: 'سوالات متداول', to: '#', icon: 'i-custom-faq' },
  { label: 'تماس با ما', to: '#', icon: 'i-custom-contact' },
]
</script>

<template>
  <header
    class="w-full bg-white rounded-b-4xl transition-all duration-200 header-shadow"
  >
    <div
      class="layout-container flex gap-6 font-bakh justify-between items-center md:py-10 md:grid md:grid-cols-12 md:items-center"
    >
      <div class="md:col-span-3 flex justify-start">
        <UButton
          icon="i-heroicons-bars-3"
          color="neutral"
          variant="ghost"
          size="lg"
          class="md:hidden"
        />
      </div>
      <nav class="hidden md:flex md:col-span-6 justify-center items-center gap-8 md:gap-10 h-6">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="relative flex items-center gap-2 text-[13px] leading-6 font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200 hover:text-primary-500"
          :class="{ 'text-primary-500 font-bold': route.path === link.to }"
        >
          <UIcon
            :name="link.icon"
            class="w-4 h-4"
          />
          <span class="whitespace-nowrap">{{ link.label }}</span>
          <span
            v-if="route.path === link.to"
            class="absolute -bottom-1.25 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-4xl"
          />
        </NuxtLink>
      </nav>
      <div class="md:col-span-3 flex justify-end">
        <NuxtLink
          to="tel:02188888888"
          class="inline-block"
        >
          <button
            class="bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center gap-2.5 h-10 px-6.5 rounded-2xl shadow-sm font-medium transition-all duration-200"
          >
            <span class="text-[14px] font-bold leading-none">تماس</span>
            <UIcon
              name="i-custom-call"
              class="w-4 h-4  text-white"
            />
          </button>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-shadow {
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.08);
}
</style>
