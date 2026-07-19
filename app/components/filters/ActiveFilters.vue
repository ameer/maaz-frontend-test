<template>
  <div
    v-if="hasActiveFilters"
    class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-4 mb-6"
    dir="rtl"
  >
    <div class="text-slate-800 font-medium text-sm leading-4 whitespace-nowrap shrink-0">
      فیلترهای اعمال شده
    </div>

    <div class="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 w-full no-scrollbar">
      <ActiveFilterChip
        v-if="searchQuery"
        :label="searchQuery"
        icon="i-mdi-magnify"
        @remove="removeFilter('q')"
      />

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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductFilters } from '~/composables/useProductFilters'
import ActiveFilterChip from './ActiveFilterChip.vue'

const props = defineProps<{
  sortOptions: { label: string, value: string, icon: string }[]
}>()

const { searchQuery, isAvailable, sortSelected, categoriesSelected, removeFilter }
  = useProductFilters()

const hasActiveFilters = computed(() =>
  !!searchQuery.value
  || isAvailable.value
  || !!sortSelected.value
  || categoriesSelected.value.length > 0,
)

const activeSort = computed(() => {
  const sortOption = props.sortOptions.find(opt => opt.value === sortSelected.value)
  return sortOption || { label: '', value: '', icon: '' }
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
