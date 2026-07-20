<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const props = defineProps<{
  category: string
}>()

const items = ref<BreadcrumbItem[]>([
  {
    label: 'صفحه اصلی',
    icon: 'i-custom-breadcrumb',
    to: '/',
  },
  {
    label: 'لیست محصولات',
    icon: '',
    to: '/products',
  },
  {
    label: props.category,
    icon: '',
    to: `/products?categories=${props.category}`,
  },
])
</script>

<template>
  <nav aria-label="مسیر صفحه">
    <UBreadcrumb :items="items" />
  </nav>
</template>
