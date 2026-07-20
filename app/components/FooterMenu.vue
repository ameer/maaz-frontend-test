<template>
  <nav
    class="flex flex-col gap-y-6"
    :aria-labelledby="titleId"
  >
    <h3
      :id="titleId"
      class="text-xl font-bold text-[#253343] mb-2 lg:w-full lg:text-right"
    >
      {{ menuTitle }}
    </h3>
    <div class="flex flex-col gap-y-4 items-start lg:w-full">
      <slot />
    </div>
  </nav>
</template>

<script setup lang="ts">
const { menuTitle } = defineProps<{
  menuTitle: string
}>()

const titleId = useId()
</script>
