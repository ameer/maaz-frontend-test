<template>
  <UCard
    dir="rtl"
    class="bg-white rounded-3xl border border-slate-100 single-product-box-shadow py-8 px-6"
    :ui="{
      body: 'flex flex-col gap-5 p-0 sm:p-0',
    }"
  >
    <div class="text-right">
      <h1 class="text-[#0A2A51] font-bold text-lg md:text-2xl leading-relaxed">
        {{ title || 'عنوان محصول' }}
      </h1>
    </div>

    <div class="relative w-full aspect-[2.8/1] sm:aspect-[3.2/1] rounded-2xl min-h-58.75 overflow-hidden bg-slate-50 group">
      <NuxtImg
        :src="image"
        :alt="title || 'تصویر محصول'"
        class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-102"
        loading="lazy"
        fit="contain"
      />

      <div class="absolute top-4 right-4 z-10">
        <button
          type="button"
          aria-label="بزرگ‌نمایی تصویر"
          :aria-expanded="isImageLightboxOpen"
          class="w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full text-white shadow-sm transition-colors cursor-pointer"
          @click="isImageLightboxOpen = true"
        >
          <UIcon
            name="i-custom-search-zoom-in"
            class="w-5 h-5 text-slate-100"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </UCard>

  <UModal
    v-model:open="isImageLightboxOpen"
    :title="title || 'تصویر محصول'"
    :ui="{
      overlay: 'bg-black/85 backdrop-blur-sm',
      content: 'bg-transparent shadow-none ring-0 border-0 w-auto max-w-[min(95vw,1200px)] p-0 overflow-visible',
      close: 'text-white hover:bg-white/10 absolute top-4 inset-e-4 z-10',
    }"
  >
    <template #content>
      <div class="flex items-center justify-center p-4 sm:p-8">
        <NuxtImg
          :src="image"
          :alt="title || 'تصویر محصول'"
          class="max-h-[85vh] w-auto max-w-full object-contain rounded-lg"
          fit="contain"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  image: string
}>()

const isImageLightboxOpen = ref(false)
</script>
