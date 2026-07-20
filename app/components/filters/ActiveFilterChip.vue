<template>
  <button
    type="button"
    class="group flex items-center gap-2 bg-[#fdf2f8] border border-rose-100 px-4 py-2 rounded-full hover:bg-rose-100 transition-colors shrink-0"
    :aria-label="`حذف فیلتر: ${label}`"
    @click="$emit('remove')"
  >
    <UIcon
      :name="icon"
      class="w-5 h-5 text-slate-800"
      aria-hidden="true"
    />
    <span class="text-sm font-bold text-slate-800">{{ label }}</span>
    <UIcon
      name="i-mdi-close"
      class="w-4 h-4 text-slate-600 group-hover:text-rose-600 transition-colors"
      aria-hidden="true"
    />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  icon: string
}>()

defineEmits<{
  (e: 'remove'): void
}>()
</script>
