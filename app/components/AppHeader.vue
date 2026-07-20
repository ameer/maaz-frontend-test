<template>
  <header
    class="w-full bg-white rounded-b-2xl md:rounded-b-4xl transition-all duration-200 header-shadow z-50 font-bakh sticky top-0"
    dir="rtl"
  >
    <!-- Explicit breakpoints to match Figma: 16px (Mobile), 80px (Tablet), 164px (Desktop) -->
    <div class="mx-auto w-full max-w-360 px-4 md:px-20 xl:px-41">
      <div class="relative flex items-center justify-between h-20 md:h-24">
        <!-- Right Side (Start): Hamburger Menu (Mobile Only) -->
        <div class="flex items-center">
          <button
            type="button"
            class="md:hidden flex items-center justify-center w-11 h-11 rounded-2xl border-2 border-primary-500 text-primary-500 hover:bg-primary-50 transition-colors"
            aria-label="باز کردن منو"
            aria-haspopup="dialog"
            @click="openMobileMenu"
          >
            <UIcon
              name="i-heroicons-bars-3"
              class="w-6 h-6"
              aria-hidden="true"
            />
          </button>
        </div>

        <!-- Center: Navigation (Hidden on Mobile) -->
        <nav
          class="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-10"
          aria-label="ناوبری اصلی"
        >
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="relative flex items-center gap-2 text-[13px] leading-6 font-medium transition-colors duration-200 group"
            :class="route.path === link.to ? 'text-primary-500 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500'"
            :aria-current="route.path === link.to ? 'page' : undefined"
          >
            <UIcon
              :name="link.icon"
              class="w-4.5 h-4.5 transition-colors"
              :class="route.path === link.to ? 'text-primary-500' : 'text-gray-500 group-hover:text-primary-500'"
              aria-hidden="true"
            />
            <span class="whitespace-nowrap">{{ link.label }}</span>

            <!-- Active State Indicator -->
            <span
              v-if="route.path === link.to"
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary-500 rounded-full"
              aria-hidden="true"
            />
          </NuxtLink>
        </nav>

        <!-- Left Side: Call Buttons -->
        <div class="flex items-center">
          <!-- Desktop & Tablet Button -->
          <NuxtLink
            to="tel:02188888888"
            class="hidden lg:flex bg-primary-500 hover:bg-primary-600 text-white items-center justify-center gap-2 h-11 px-6 rounded-2xl shadow-sm transition-all duration-200"
            aria-label="تماس با ما: ۰۲۱۸۸۸۸۸۸۸۸"
          >
            <span class="text-sm font-bold leading-none mt-0.5">تماس</span>
            <UIcon
              name="i-custom-call"
              class="w-5 h-5 text-white"
              aria-hidden="true"
            />
          </NuxtLink>

          <!-- Mobile Button (Icon Only) -->
          <NuxtLink
            to="tel:02188888888"
            class="lg:hidden flex items-center justify-center w-11 h-11 rounded-2xl border-2 border-primary-500 text-primary-500 hover:bg-primary-50 transition-colors"
            aria-label="تماس با ما: ۰۲۱۸۸۸۸۸۸۸۸"
          >
            <UIcon
              name="i-custom-call"
              class="w-6 h-6"
              aria-hidden="true"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { LazyAppHeaderMobileMenu } from '#components'

const route = useRoute()
const overlay = useOverlay()

const links = [
  { label: 'لیست محصولات', to: '/products', icon: 'i-custom-products' },
  { label: 'دریافت مشاوره', to: '/#', icon: 'i-custom-consultation' },
  { label: 'سوالات متداول', to: '/#', icon: 'i-custom-faq' },
  { label: 'تماس با ما', to: '/#', icon: 'i-custom-contact' },
]
const slideover = overlay.create(LazyAppHeaderMobileMenu)

async function openMobileMenu() {
  slideover.open({
    links,
  })
}
</script>

<style scoped>
.header-shadow {
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.08);
}
</style>
