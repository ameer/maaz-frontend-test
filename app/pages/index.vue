<template>
  <div class="space-y-6 py-12 text-center">
    <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
      درب‌های اتوماتیک هوشمند پیندُر
    </h1>
    <p class="max-w-xl mx-auto text-lg text-gray-500">
      پروژه پیاده‌سازی پورتال کاتالوگ محصولات با استفاده از Nuxt UI و داده‌های شبیه‌سازی شده.
    </p>
    <div class="flex justify-center gap-4">
      <UButton
        to="/products"
        label="مشاهده کاتالوگ محصولات"
        size="lg"
        trailing-icon="i-heroicons-arrow-left"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: 'صفحه اصلی',
  description: 'خرید جدیدترین محصولات دیجیتال و لوازم خانگی با بهترین قیمت و ضمانت بازگشت وجه.',
  ogTitle: 'فروشگاه اینترنتی | صفحه اصلی',
  ogDescription: 'خرید جدیدترین محصولات دیجیتال و لوازم خانگی با بهترین قیمت و ضمانت بازگشت وجه.',
  ogImage: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png',
  twitterCard: 'summary_large_image',
})
</script>
