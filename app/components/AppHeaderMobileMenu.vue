<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps<{
  links: { label: string, to: string, icon: string }[]
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <USlideover
    :close="{ onClick: () => emit('close', false) }"
    side="right"
  >
    <template #body>
      <!-- Sidebar Navigation -->
      <nav class="flex flex-col gap-2 p-4 flex-1">
        <NuxtLink
          v-for="link in props.links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-200 group"
          :class="route.path === link.to ? 'bg-primary-50 text-primary-500 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-primary-500'"
          @click="emit('close', false)"
        >
          <UIcon
            :name="link.icon"
            class="w-5 h-5 transition-colors"
            :class="route.path === link.to ? 'text-primary-500' : 'text-slate-400 group-hover:text-primary-500'"
          />
          <span class="text-sm mt-0.5">{{ link.label }}</span>
        </NuxtLink>
      </nav>
    </template>
  </USlideover>
</template>
