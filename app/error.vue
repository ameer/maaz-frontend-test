<script setup lang="ts">
import type { NuxtError } from '#app'
import { fa_ir } from '@nuxt/ui/locale'

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error?.statusCode === 404)

const title = computed(() =>
  is404.value ? 'صفحه مورد نظر یافت نشد' : 'خطایی رخ داده است',
)

const description = computed(() =>
  is404.value
    ? 'آدرسی که وارد کرده‌اید اشتباه است یا صفحه حذف شده است. می‌توانید به صفحه اصلی یا کاتالوگ محصولات بازگردید.'
    : 'متأسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید یا به صفحه اصلی بازگردید.',
)

const goHome = () => clearError({ redirect: '/' })
const goProducts = () => clearError({ redirect: '/products' })
</script>

<template>
  <UApp
    :locale="fa_ir"
    dir="rtl"
  >
    <div
      class="min-h-screen bg-[#e9edf5] text-gray-900 antialiased flex flex-col selection:bg-primary-500 selection:text-white"
    >
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
        class="layout-container flex-1 flex items-center justify-center py-12 mx-auto w-full"
      >
        <div
          class="w-full max-w-xl flex flex-col items-center text-center bg-white rounded-3xl border border-slate-200 shadow-sm px-6 py-16 sm:px-10"
        >
          <div
            class="relative mb-8 flex items-center justify-center"
            aria-hidden="true"
          >
            <span
              class="font-bakh text-[7rem] sm:text-[9rem] leading-none font-bold text-primary-500/10 select-none faNum"
            >
              {{ error?.statusCode || 404 }}
            </span>
            <UIcon
              :name="is404 ? 'i-mdi-map-marker-question-outline' : 'i-mdi-alert-circle-outline'"
              class="absolute w-16 h-16 text-primary-500"
              aria-hidden="true"
            />
          </div>

          <h1 class="font-bakh text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
            {{ title }}
          </h1>

          <p class="text-slate-500 text-base leading-7 max-w-md mb-10">
            {{ description }}
          </p>

          <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <UButton
              color="primary"
              size="lg"
              class="w-full sm:w-auto justify-center rounded-2xl"
              trailing-icon="i-heroicons-home"
              @click="goHome"
            >
              بازگشت به صفحه اصلی
            </UButton>

            <UButton
              v-if="is404"
              color="neutral"
              variant="outline"
              size="lg"
              class="w-full sm:w-auto justify-center rounded-2xl"
              trailing-icon="i-heroicons-arrow-left"
              @click="goProducts"
            >
              مشاهده محصولات
            </UButton>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  </UApp>
</template>
