<template>
  <!-- Availability -->
  <FilterBox>
    <div class="flex items-center justify-between">
      <span
        id="available-filter-label"
        class="text-sm font-medium text-[#445A74]"
      >محصولات موجود</span>
      <USwitch
        v-model="isAvailable"
        aria-labelledby="available-filter-label"
      />
    </div>
  </FilterBox>

  <!-- Sort -->
  <FilterBox>
    <UAccordion
      :default-value="['sort']"
      :items="[{ label: 'مرتب‌سازی', value: 'sort' }]"
      class="text-[#445A74]"
      :ui="accordionUi"
    >
      <template #body>
        <URadioGroup
          v-model="sortSelected"
          :items="sortOptions"
          indicator="hidden"
          class="space-y-4 mt-2"
          :ui="{ label: 'cursor-pointer w-full text-right', fieldset: 'gap-y-5' }"
          dir="rtl"
        >
          <template #label="{ item }">
            <div
              class="flex items-center gap-2"
              :class="sortSelected === item.value ? 'text-[#344456]' : 'text-[#647E9A]'"
            >
              <UIcon
                v-if="sortSelected === item.value"
                name="i-custom:radio-filled"
                class="text-primary-500"
                size="16px"
                aria-hidden="true"
              />
              <UIcon
                v-else
                name="i-mdi:circle-outline"
                size="16px"
                aria-hidden="true"
              />
              <span class="text-xs font-medium">{{ item.label }}</span>
            </div>
          </template>
        </URadioGroup>
      </template>
    </UAccordion>
  </FilterBox>

  <!-- Categories -->
  <FilterBox>
    <UAccordion
      :default-value="['category']"
      :items="[{ label: 'دسته‌بندی', value: 'category' }]"
      class="text-[#445A74]"
      :ui="accordionUi"
    >
      <template #body>
        <div class="flex flex-col gap-4 mt-2">
          <UCheckboxGroup
            v-model="categoriesSelected"
            :items="categories"
            dir="rtl"
            :ui="{ fieldset: 'gap-y-4' }"
          >
            <template #label="{ item }">
              <label class="flex items-center justify-between cursor-pointer group w-full">
                <span class="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{{ item.label }}</span>
                <div
                  class="px-2 py-1 rounded-md text-xs font-medium text-white transition-colors flex items-center justify-center min-w-7 h-7"
                  :class="categoriesSelected.includes(item.value) ? 'bg-rose-600' : 'bg-[#1e293b]'"
                  aria-hidden="true"
                >
                  {{ formatNumberFA(item.count) }}
                </div>
              </label>
            </template>
          </UCheckboxGroup>
        </div>
      </template>
    </UAccordion>
  </FilterBox>
</template>

<script setup lang="ts">
import { useProductFilters } from '~/composables/useProductFilters'
import FilterBox from './FilterBox.vue'

defineProps<{
  categories: { label: string, value: string, count: number }[]
  sortOptions: { label: string, value: string }[]
}>()

const { isAvailable, sortSelected, categoriesSelected } = useProductFilters()

const accordionUi = {
  trigger: 'cursor-pointer pt-0 data-[state=open]:pb-5 data-[state=closed]:pb-0',
}

const formatNumberFA = (num: number) =>
  new Intl.NumberFormat('fa-IR').format(num)
</script>
