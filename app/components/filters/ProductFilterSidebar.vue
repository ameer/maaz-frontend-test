<template>
  <div class="w-full">
    <div class="md:hidden w-full flex flex-col gap-4 mb-6">
      <div class="bg-white rounded-3xl filter-box-card-shadow p-4 flex items-center justify-between gap-4 w-full border border-slate-100">
        <div class="flex-1 relative">
          <UInput
            v-model="localSearchInput"
            type="search"
            placeholder="جستجو در محصولات..."
            icon="i-mdi-magnify"
            size="lg"
            class="rounded-xl w-full"
            aria-label="جستجو در محصولات"
            :ui="{ base: 'focus-visible:outline-0' }"
            @keyup="debouncedSearch"
          >
            <template #trailing>
              <UButton
                v-if="localSearchInput"
                color="primary"
                variant="link"
                size="sm"
                aria-label="پاک کردن جستجو"
                class="text-slate-400 hover:text-rose-500"
                @click.prevent="clearLocalSearch"
              >
                <UIcon
                  name="i-mdi-close"
                  class="w-5 h-5"
                  aria-hidden="true"
                />
              </UButton>
            </template>
          </UInput>
        </div>

        <div class="relative shrink-0">
          <UButton
            variant="outline"
            icon="i-mdi-filter-variant"
            size="lg"
            class="rounded-xl"
            :aria-label="filterButtonLabel"
            @click="openFilterSlideover"
          >
            فیلترها
          </UButton>
          <div
            v-if="activeFilterCount > 0"
            class="absolute -top-2 -right-2 bg-rose-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-bold shadow-md z-10"
            aria-hidden="true"
          >
            {{ formatNumberFA(activeFilterCount) }}
          </div>
        </div>
      </div>
    </div>

    <div class="hidden md:flex flex-col gap-6 w-full">
      <FilterBox>
        <div class="flex flex-col gap-4">
          <h2 class="text-slate-500 font-bold text-sm text-right">
            فیلتر و جستجو
          </h2>

          <UForm
            class="space-y-4"
            @submit.prevent="applySearch"
          >
            <div class="relative">
              <UInput
                ref="searchInput"
                v-model="localSearchInput"
                type="search"
                placeholder="جستجو در محصولات..."
                icon="i-mdi-magnify"
                size="lg"
                class="rounded-xl w-full"
                aria-label="جستجو در محصولات"
                :ui="{ base: 'focus-visible:outline-0' }"
                @keyup.enter="applySearch"
              >
                <template #trailing>
                  <UButton
                    v-if="localSearchInput"
                    color="primary"
                    variant="link"
                    size="sm"
                    aria-label="پاک کردن جستجو"
                    class="text-slate-400 hover:text-rose-500"
                    @click.prevent="clearLocalSearch"
                  >
                    <UIcon
                      name="i-mdi-close"
                      class="w-5 h-5"
                    />
                  </UButton>
                  <UKbd
                    v-else
                    value="/"
                  />
                </template>
              </UInput>
            </div>

            <UButton
              type="submit"
              color="primary"
              block
              size="lg"
              class="cursor-pointer rounded-xl font-bold text-base bg-primary-500 hover:bg-primary-600"
            >
              جستجو
            </UButton>
          </UForm>
        </div>
      </FilterBox>

      <ProductFilterPanels
        :categories="categories"
        :sort-options="sortOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed, onMounted } from 'vue'
import { LazyFiltersProductFilterSlideover } from '#components'
import { useProductFilters } from '~/composables/useProductFilters'
import FilterBox from './FilterBox.vue'
import ProductFilterPanels from './ProductFilterPanels.vue'

const props = defineProps<{
  categories: { label: string, value: string, count: number }[]
  sortOptions: { label: string, value: string }[]
}>()

const { searchQuery, isAvailable, sortSelected, categoriesSelected } = useProductFilters()

const localSearchInput = ref(searchQuery.value)
const searchInput = ref<{ inputRef?: { focus: () => void } }>()

const overlay = useOverlay()
const filterSlideover = overlay.create(LazyFiltersProductFilterSlideover)

function openFilterSlideover() {
  filterSlideover.open({
    categories: props.categories,
    sortOptions: props.sortOptions,
  })
}

const focusSearchInput = () => {
  setTimeout(() => {
    searchInput.value?.inputRef?.focus?.()
  }, 100)
}

const applySearch = async () => {
  const trimmed = localSearchInput.value.trim()
  searchQuery.value = trimmed
  await nextTick()
  focusSearchInput()
}

let debounceTimeout: ReturnType<typeof setTimeout> | null = null
const debouncedSearch = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    applySearch()
  }, 500)
}

const clearLocalSearch = () => {
  localSearchInput.value = ''
  searchQuery.value = ''
  focusSearchInput()
}

watch(searchQuery, (newVal) => {
  localSearchInput.value = newVal
})

const activeFilterCount = computed(() => {
  let count = 0
  if (isAvailable.value) count++
  if (sortSelected.value && sortSelected.value !== 'sort') count++
  count += categoriesSelected.value.length
  return count
})

const filterButtonLabel = computed(() => {
  if (activeFilterCount.value === 0) return 'فیلترها'
  return `فیلترها، ${formatNumberFA(activeFilterCount.value)} فیلتر فعال`
})

onMounted(() => {
  if (localSearchInput.value) {
    focusSearchInput()
  }
})

defineShortcuts({
  '/': () => focusSearchInput(),
})

const formatNumberFA = (num: number) =>
  new Intl.NumberFormat('fa-IR').format(num)
</script>
