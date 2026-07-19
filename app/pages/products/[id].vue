<template>
  <div
    class="min-h-screen pb-16"
  >
    <UContainer class="px-0 sm:px-0 lg:px-0">
      <div
        v-if="pending"
        class="flex flex-col items-center justify-center py-32 text-slate-400"
      >
        <UIcon
          name="i-mdi-loading"
          class="w-12 h-12 animate-spin mb-4 text-rose-500"
        />
        <p class="font-medium">
          در حال دریافت اطلاعات محصول...
        </p>
      </div>

      <div
        v-else-if="product"
        class="flex flex-col gap-6"
      >
        <!-- Breadcrumbs -->
        <ProductBreadcrumb :category="product.category" />

        <!-- Main Content Area -->
        <div class="flex flex-col gap-6">
          <UCard
            dir="rtl"
            class="bg-white rounded-3xl border border-slate-100 single-product-box-shadow py-8 px-6"
            :ui="{
              body: 'flex flex-col gap-5 p-0 sm:p-0',
            }"
          >
            <div class="text-right">
              <h3 class="text-slate-800 font-bold text-2xl leading-relaxed">
                {{ product.title || 'عنوان محصول' }}
              </h3>
            </div>

            <div class="relative w-full aspect-[2.8/1] sm:aspect-[3.2/1] rounded-2xl overflow-hidden bg-slate-50 group">
              <!-- The Product Image -->
              <NuxtImg
                :src="product.image"
                alt="Product Showcase"
                class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-102"
                loading="lazy"
                fit="contain"
              />

              <!-- Image Overlay Action Button -->
              <div class="absolute top-4 right-4 z-10">
                <button
                  type="button"
                  aria-label="Zoom Image"
                  class="w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full text-white shadow-sm transition-colors cursor-pointer"
                >
                  <UIcon
                    name="i-custom-search-zoom-in"
                    class="w-5 h-5 text-slate-100"
                  />
                </button>
              </div>
            </div>
          </UCard>
          <UCard
            dir="rtl"
            class="bg-white rounded-3xl border border-slate-100 single-product-box-shadow p-6"
            :ui="{
              body: 'flex flex-col gap-5 p-0 sm:p-0',
            }"
          >
            <div class="text-right">
              <h3 class="text-slate-800 font-bold text-xl leading-relaxed">
                مشخصات فنی
              </h3>
            </div>
            <div class="flex flex-col gap-3">
              <div
                v-for="({ text, value }, i) in productInfoArray"
                :key="`product-info-${i}`"
                class="flex flex-row items-stretch w-full gap-3"
              >
                <div
                  class="bg-[#F5F7FA] text-[#57728E] text-sm font-medium rounded-r-[16px] rounded-l-[4px] py-3 px-4 w-1/6 flex items-center"
                  v-text="text"
                />
                <div
                  v-if="Array.isArray(value)"
                  class="bg-[#F5F7FA] text-[#30445B] text-[13px] font-bold rounded-l-[16px] rounded-r-[4px] py-3 px-4 w-5/6 flex items-center faNum"
                >
                  <ul class="list-disc list-inside">
                    <li
                      v-for="(v, j) in value"
                      :key="`product-info-${i}-${j}`"
                      class="my-2"
                      v-text="v"
                    />
                  </ul>
                </div>
                <div
                  v-else
                  class="bg-[#F5F7FA] text-[#30445B] text-[13px] font-bold rounded-l-[16px] rounded-r-[4px] py-3 px-4 w-5/6 flex items-center faNum"
                  v-text="value"
                />
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Error / Not Found State -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-32 text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm mt-8"
      >
        <UIcon
          name="i-mdi-alert-circle-outline"
          class="w-16 h-16 mb-4 text-rose-500"
        />
        <h2 class="text-xl font-bold text-slate-800 mb-2">
          محصول یافت نشد
        </h2>
        <p class="mb-6">
          محصول مورد نظر شما در سیستم ثبت نشده است یا حذف شده است.
        </p>
        <UButton
          to="/products"
          color="primary"
          variant="solid"
        >
          بازگشت به لیست محصولات
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProducts } from '~/composables/useProducts'
import ProductBreadcrumb from '~/components/products/ProductBreadcrumb.vue'

const route = useRoute()
const productId = route.params.id as string

const { fetchProductById } = useProducts()

const { data: product, pending } = await fetchProductById(productId, 'pindoor')

const productInfoConfig: ProductInfoConfig = {
  price: { t: 'قیمت', f: (v: number) => v.toLocaleString('fa-IR') },
  description: { t: 'توضیحات', f: (v: string) => v.split('،') },
  category: { t: 'دسته‌بندی' },
  rank: { t: 'رتبه' },
  count: { t: 'تعداد', f: (v: string | number) => v.toLocaleString('fa-IR') },
}

const productInfoArray = computed(() => {
  if (product.value) {
    return Object.entries(product.value).reduce((acc, [key, value]) => {
      if (Object.hasOwn(productInfoConfig, key)) {
        const { t, f } = productInfoConfig[key]!

        // Cast the function execution locally to safely bypass contravariance
        const processedValue = f ? (f as (v: unknown) => unknown)(value) : value

        acc.push({ text: t, value: processedValue })
      }
      return acc
    }, [] as { text: string, value: unknown }[])
  }
  return []
})
</script>

<style scoped>
.single-product-box-shadow {
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06);
}
</style>
