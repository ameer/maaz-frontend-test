<template>
  <div
    class="min-h-screen pb-12"
  >
    <UContainer class="px-0 md:px-4 lg:px-3 xl:px-0 pt-8">
      <h1 class="sr-only">
        لیست محصولات
      </h1>

      <p
        class="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {{ productResultsAnnouncement }}
      </p>

      <div class="flex flex-col md:flex-row gap-2 sm:gap-4 md:gap-8">
        <!-- Sidebar (Right Side) -->
        <aside
          class="md:min-w-66.5"
          aria-label="فیلتر و جستجوی محصولات"
        >
          <ProductFilterSidebar
            :categories="dynamicCategories"
            :sort-options="sortOptions"
          />
        </aside>

        <!-- Main Content (Left Side) -->
        <section
          class="md:w-3/4"
          aria-label="نتایج محصولات"
        >
          <ActiveFilters :sort-options="sortOptions" />

          <!-- Loading State Grid -->
          <div
            v-if="pending"
            class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8 relative"
            role="status"
            aria-busy="true"
            aria-label="در حال بارگذاری محصولات"
          >
            <ProductCardSkeleton
              v-for="i in 12"
              :key="`skeleton-${i}`"
            />
          </div>

          <!-- Active Products Grid with Transitions -->
          <TransitionGroup
            v-else-if="filteredProducts && filteredProducts.length"
            name="product-list"
            tag="ul"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 relative list-none p-0 m-0"
            role="list"
            aria-label="لیست محصولات"
          >
            <li
              v-for="product in filteredProducts"
              :key="product.id"
              class="list-none"
            >
              <ProductCard
                :product="product"
                :sort-selected="sortSelected"
              />
            </li>
          </TransitionGroup>

          <!-- Empty State -->
          <div
            v-else
            class="flex flex-col items-center justify-center py-24 text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm"
            role="status"
          >
            <UIcon
              name="i-mdi-package-variant"
              class="w-20 h-20 mb-6 opacity-30 text-rose-500"
              aria-hidden="true"
            />
            <h3 class="text-xl font-bold text-slate-700 mb-2">
              محصولی یافت نشد
            </h3>
            <p class="text-slate-500">
              لطفا فیلترهای خود را تغییر دهید یا جستجوی دیگری را امتحان کنید.
            </p>
          </div>
        </section>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ActiveFilters from '~/components/filters/ActiveFilters.vue'
import ProductCard from '~/components/products/ProductCard.vue'
import ProductCardSkeleton from '~/components/products/ProductCardSkeleton.vue'
import ProductFilterSidebar from '~/components/filters/ProductFilterSidebar.vue'
import { useProducts } from '~/composables/useProducts'
import { useProductFilters } from '~/composables/useProductFilters'
import type { FakeStoreProduct, PindoorProduct } from '~/utils/productAdapter'

// 1. Fetch initial data once
const { fetchAllProducts } = useProducts()
const { data: products, pending } = await fetchAllProducts('pindoor')

// 2. Hydrate query/filter state dynamically
const { searchQuery, isAvailable, sortSelected, categoriesSelected } = useProductFilters()

// Configurable generic sort options (Format: property_direction)
const sortOptions = [
  { value: 'count_asc', label: 'تعداد: کم به زیاد', icon: 'i-custom-sort-amount-up' },
  { value: 'count_desc', label: 'تعداد: زیاد به کم', icon: 'i-custom-sort-amount-down' },
  { value: 'rank_desc', label: 'رتبه: زیاد به کم', icon: 'i-custom-sort-amount-down' },
  { value: 'rank_asc', label: 'رتبه: کم به زیاد', icon: 'i-custom-sort-amount-up' },
]

// 3. Dynamically map categories from the loaded data payload
const dynamicCategories = computed(() => {
  if (!products.value) return []
  const categoryCounts = new Map<string, number>()

  // We filter base counts by search so the sidebar precisely reflects active constraints
  let baseData = products.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    baseData = baseData.filter(p =>
      p.title.toLowerCase().includes(q),
    )
  }

  baseData.forEach((p) => {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) || 0) + 1)
  })

  return Array.from(categoryCounts.entries()).map(([label, count]) => ({
    value: label,
    label,
    count,
  }))
})

// 4. Apply filters over initial payload locally
const filteredProducts = computed<FakeStoreProduct[] | PindoorProduct[]>(() => {
  let result = products.value || []

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(q),
    )
  }

  if (isAvailable.value) {
    result = result.filter(p => 'count' in p && Number(p.count) > 0)
  }

  if (categoriesSelected.value.length > 0) {
    result = result.filter(p => categoriesSelected.value.includes(p.category))
  }

  // 5. Generic Extracted Sorting
  if (sortSelected.value) {
    const [property, order] = sortSelected.value.split('_') as [keyof FakeStoreProduct, 'asc' | 'desc']

    result = [...result].sort((a, b) => {
      const valA = a[property]
      const valB = b[property]

      if (typeof valA === 'number' && typeof valB === 'number') {
        return order === 'asc' ? valA - valB : valB - valA
      }
      if (valA < valB) return order === 'asc' ? -1 : 1
      if (valA > valB) return order === 'asc' ? 1 : -1
      return 0
    })
  }

  return result
})

const formatNumberFA = (num: number) =>
  new Intl.NumberFormat('fa-IR').format(num)

const productResultsAnnouncement = computed(() => {
  if (pending.value) return 'در حال بارگذاری محصولات'
  const count = filteredProducts.value?.length ?? 0
  if (count === 0) return 'محصولی یافت نشد'
  return `${formatNumberFA(count)} محصول یافت شد`
})
</script>

<style scoped>
/* Vue Transition Group smooth fade logic */
.product-list-enter-active,
.product-list-leave-active {
  transition: all 0.4s ease;
}
.product-list-enter-from,
.product-list-leave-to {
  opacity: 0;
  transform: translateY(15px) scale(0.98);
}
.product-list-leave-active {
  /* position: absolute; */
  visibility: hidden;
}
</style>
