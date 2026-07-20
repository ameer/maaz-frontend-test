<template>
  <div
    class="flex flex-col items-center justify-center py-32 text-slate-400"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <UIcon
      name="i-mdi-loading"
      class="w-12 h-12 animate-spin mb-4 text-rose-500"
      aria-hidden="true"
    />
    <p class="font-medium">
      در حال دریافت اطلاعات محصول...
    </p>
  </div>
</template>
