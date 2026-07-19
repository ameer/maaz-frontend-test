<template>
  <UCard
    variant="solid"
    class="bg-white rounded-3xl filter-box-card-shadow"
    :ui="{ body: 'p-4 sm:p-4' }"
  >
    <slot />
  </UCard>
</template>

<style scoped>
.filter-box-card-shadow {
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.03);
}
</style>
