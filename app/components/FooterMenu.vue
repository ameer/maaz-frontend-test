<template>
  <div class="flex flex-col gap-y-6">
    <h3 class="text-xl font-bold text-[#253343] mb-2 lg:w-full lg:text-right">
      {{ menuTitle }}
    </h3>
    <div class="flex flex-col gap-y-4 items-start lg:w-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps <{
  menuTitle: string
}> ()
</script>
