<template>
  <USlideover
    :close="{ onClick: close }"
    side="left"
    title="فیلتر و مرتب‌سازی"
    :ui="{ body: 'bg-[#e9edf5]' }"
  >
    <template #body>
      <div class="flex flex-col gap-6 h-full">
        <div
          v-if="hasActiveFilters"
          class="p-4 bg-white border-b border-slate-100 flex flex-wrap gap-2 shrink-0 rounded-2xl"
          role="region"
          aria-label="فیلترهای اعمال شده"
        >
          <span class="text-xs font-bold text-slate-500 w-full mb-1">فیلترهای اعمال شده:</span>

          <ActiveFilterChip
            v-if="sortSelected"
            :label="activeSort.label"
            :icon="activeSort.icon || 'i-mdi-sort-variant'"
            @remove="removeFilter('sort')"
          />

          <ActiveFilterChip
            v-if="isAvailable"
            label="محصولات موجود"
            icon="i-mdi-check-circle-outline"
            @remove="removeFilter('available')"
          />

          <ActiveFilterChip
            v-for="catValue in categoriesSelected"
            :key="catValue"
            :label="catValue"
            icon="i-mdi-shape-outline"
            @remove="removeFilter('category', catValue)"
          />
        </div>

        <div class="flex-1 overflow-y-auto p-0 space-y-6">
          <ProductFilterPanels
            :categories="categories"
            :sort-options="sortOptions"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <UButton
        color="primary"
        block
        size="lg"
        class="rounded-xl font-bold text-base bg-primary-500 hover:bg-primary-600 cursor-pointer"
        @click="close"
      >
        اعمال فیلترها
      </UButton>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductFilters } from '~/composables/useProductFilters'
import ActiveFilterChip from './ActiveFilterChip.vue'
import ProductFilterPanels from './ProductFilterPanels.vue'

const props = defineProps<{
  categories: { label: string, value: string, count: number }[]
  sortOptions: { label: string, value: string, icon?: string }[]
}>()

const emit = defineEmits<{ close: [boolean] }>()

const { isAvailable, sortSelected, categoriesSelected, removeFilter } = useProductFilters()

const hasActiveFilters = computed(() =>
  isAvailable.value
  || !!sortSelected.value
  || categoriesSelected.value.length > 0,
)

const activeSort = computed(() => {
  const sortOption = props.sortOptions.find(opt => opt.value === sortSelected.value)
  return sortOption || { label: '', value: '', icon: '' }
})

function close() {
  emit('close', false)
}
</script>
