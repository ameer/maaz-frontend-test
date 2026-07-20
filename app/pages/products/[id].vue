<template>
  <div class="min-h-screen pb-16">
    <UContainer class="px-0 sm:px-0 lg:px-0">
      <ProductDetailLoading v-if="pending" />

      <div
        v-else-if="product"
        class="flex flex-col gap-6"
      >
        <ProductBreadcrumb :category="product.category" />

        <div class="flex flex-col gap-6">
          <ProductDetailHero
            :title="product.title"
            :image="product.image"
          />
          <ProductSpecs :product="product" />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProducts } from '~/composables/useProducts'
import ProductBreadcrumb from '~/components/products/ProductBreadcrumb.vue'
import ProductDetailHero from '~/components/products/ProductDetailHero.vue'
import ProductDetailLoading from '~/components/products/ProductDetailLoading.vue'
import ProductSpecs from '~/components/products/ProductSpecs.vue'

const route = useRoute()
const productId = route.params.id as string

const { fetchProductById } = useProducts()

const { data: product, pending, error } = await fetchProductById(productId, 'pindoor')
if (product.value) {
  useSeoMeta({
    title: product.value.title,
    description: product.value.description,
    ogTitle: product.value.title,
    ogDescription: product.value.description,
    ogImage: product.value.image,
    ogType: 'website',
    twitterCard: 'summary_large_image',
  })
}
if (!pending.value && (error.value || !product.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'محصول یافت نشد',
    fatal: true,
  })
}
</script>
