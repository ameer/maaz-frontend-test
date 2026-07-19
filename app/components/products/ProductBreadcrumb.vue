<template>
  <div>
    <!-- Hierarchy Breadcrumb -->
    <div class="flex items-center gap-2 text-sm text-slate-500 font-medium">
      <NuxtLink
        to="/products"
        class="hover:text-slate-800 transition-colors"
      >لیست محصولات
      </NuxtLink>
      <UIcon
        name="i-mdi-chevron-left"
        class="w-4 h-4"
      />
      <span class="text-rose-500">{{ category }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  category: string
}>()
</script>
