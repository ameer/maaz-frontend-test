<template>
  <NuxtLink :to="`/products/${product.id}`">
    <UCard
      variant="solid"
      class="bg-white product-card-shadow"
    >
      <div class="bg-slate-50 relative rounded-2xl overflow-hidden aspect-4/3 flex items-center justify-center p-2">
        <NuxtImg
          :src="product.image"
          :alt="product.title"
          placeholder
          class="w-full h-full object-contain mix-blend-multiply"
          loading="lazy"
        />
        <UBadge
          v-if="sortSelected"
          color="primary"
          class="absolute top-2 left-2 z-10 faNum"
        >
          {{ chipText }}
        </UBadge>
      </div>
      <!-- Product Details -->
      <div class="flex-1 flex flex-col justify-between">
        <h3
          class="text-slate-800 dark:text-slate-100 font-bold text-sm leading-relaxed text-right truncate py-4"
          :title="product.title"
        >
          {{ product.title }}
        </h3>

        <div
          class="text-rose-500 flex items-center justify-center gap-1 hover:text-rose-600 transition-all zw-border border-[#E9EDF5] rounded-2xl py-3 leading-4 hover:-translate-y-1"
        >
          <span class="text-sm font-bold leading-4">مشاهده جزئیات</span>
          <UIcon
            name="i-mdi-chevron-left"
            class="w-4 h-4"
          />
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { FakeStoreProduct, PindoorProduct } from '~/utils/productAdapter'

const props = defineProps<{
  product: FakeStoreProduct | PindoorProduct
  sortSelected: string
  showCount?: boolean
  isAvailable?: boolean
}>()

const sortMetric = computed(() => {
  const [property] = props.sortSelected.split('_') as [keyof FakeStoreProduct]
  return property
})

const chipText = computed(() => {
  const translation = { rank: 'رتبه', count: 'تعداد' }
  return translation[sortMetric.value as keyof typeof translation] + ': ' + props.product[sortMetric.value as keyof FakeStoreProduct]
})
</script>

<style scoped>
.product-card-shadow {
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.05);
}
</style>
