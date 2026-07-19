<template>
  <UCard
    :ui="{
      root: 'flex flex-col h-full',
      body: 'p-4',
    }"
  >
    <USkeleton class="w-full aspect-4/3 rounded-xl mb-4" />
    <div class="flex-1 flex flex-col justify-between gap-4">
      <div class="space-y-3">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-2/3" />
      </div>
      <div class="flex justify-end mt-auto">
        <USkeleton class="h-5 w-28 rounded-md" />
      </div>
    </div>
  </UCard>
</template>
