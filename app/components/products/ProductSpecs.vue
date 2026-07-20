<template>
  <UCard
    dir="rtl"
    class="bg-white rounded-3xl border border-slate-100 single-product-box-shadow p-6"
    :ui="{
      body: 'flex flex-col gap-5 p-0 sm:p-0',
    }"
  >
    <div class="text-right">
      <h2 class="text-slate-800 font-bold text-xl leading-relaxed">
        مشخصات فنی
      </h2>
    </div>
    <dl class="flex flex-col gap-3">
      <div
        v-for="({ text, value }, i) in rows"
        :key="`product-info-${i}`"
        class="flex flex-row flex-wrap lg:flex-nowrap items-stretch w-full gap-3"
      >
        <dt
          class="bg-[#F5F7FA] text-[#57728E] text-sm font-medium rounded-[16px] lg:rounded-r-[16px] lg:rounded-l-[4px] py-3 px-4 w-full md:w-1/4 lg:w-1/6 flex items-center"
        >
          {{ text }}
        </dt>
        <dd
          v-if="Array.isArray(value)"
          class="bg-[#F5F7FA] text-[#30445B] text-[13px] font-bold rounded-[16px] lg:rounded-l-[16px] lg:rounded-r-[4px] py-3 px-4 w-full md:w-3/4 lg:w-5/6 flex items-center faNum m-0"
        >
          <ul class="list-disc list-inside">
            <li
              v-for="(v, j) in value"
              :key="`product-info-${i}-${j}`"
              class="my-2"
            >
              {{ v }}
            </li>
          </ul>
        </dd>
        <dd
          v-else
          class="bg-[#F5F7FA] text-[#30445B] text-[13px] font-bold rounded-[16px] lg:rounded-l-[16px] lg:rounded-r-[4px] py-3 px-4 w-full md:w-3/4 lg:w-5/6 flex items-center faNum m-0"
        >
          {{ value }}
        </dd>
      </div>
    </dl>
  </UCard>
</template>

<script setup lang="ts">
import type { FakeStoreProduct, PindoorProduct } from '~/utils/productAdapter'

const props = defineProps<{
  product: FakeStoreProduct | PindoorProduct
}>()

const productInfoConfig: ProductInfoConfig = {
  price: { t: 'قیمت', f: (v: number) => v.toLocaleString('fa-IR'), suffix: 'تومان' },
  description: { t: 'توضیحات', f: (v: string) => v.split('،') },
  category: { t: 'دسته‌بندی' },
  rank: { t: 'رتبه' },
  count: { t: 'تعداد', f: (v: string | number) => v.toLocaleString('fa-IR') },
}

const rows = computed(() => {
  return Object.entries(props.product).reduce((acc, [key, value]) => {
    if (Object.hasOwn(productInfoConfig, key)) {
      const { t, suffix, f } = productInfoConfig[key]!
      const processedValue = f ? (f as (v: unknown) => unknown)(value) : value
      const output = { text: t, value: processedValue }
      if (suffix) output.value += ` ${suffix}`
      acc.push(output)
    }
    return acc
  }, [] as { text: string, value: unknown }[])
})
</script>
