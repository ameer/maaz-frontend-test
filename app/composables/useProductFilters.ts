import { computed } from 'vue'
import { useRoute, useRouter } from '#imports'

export const useProductFilters = () => {
  const route = useRoute()
  const router = useRouter()

  const updateQuery = (key: string, value: string | string[] | boolean | null) => {
    const query = { ...route.query } as Record<string, string | string[]>

    if (value === null || value === undefined || value === '' || value === false || (Array.isArray(value) && value.length === 0)) {
      const { [key]: _, ...rest } = query
      router.replace({ query: rest })
      return
    }

    query[key] = value as string | string[]

    // Soft routing to prevent page reloads
    router.replace({ query })
  }

  const searchQuery = computed({
    get: () => (route.query.q as string) || '',
    set: (val: string) => updateQuery('q', val),
  })

  const isAvailable = computed({
    get: () => route.query.available === 'true',
    set: (val: boolean) => updateQuery('available', val ? 'true' : null),
  })

  const sortSelected = computed({
    get: () => (route.query.sort as string) || '',
    set: (val: string) => updateQuery('sort', val),
  })

  const categoriesSelected = computed({
    get: (): string[] => {
      const val = route.query.categories
      if (!val) return []
      return Array.isArray(val) ? (val as string[]) : [val as string]
    },
    set: (val: string[]) => updateQuery('categories', val),
  })

  const removeFilter = (type: 'q' | 'available' | 'sort' | 'category', value?: string) => {
    if (type === 'q') searchQuery.value = ''
    if (type === 'available') isAvailable.value = false
    if (type === 'sort') sortSelected.value = ''
    if (type === 'category' && value) {
      categoriesSelected.value = categoriesSelected.value.filter(c => c !== value)
    }
  }

  const clearAll = () => {
    router.replace({ query: {} })
  }

  return {
    searchQuery,
    isAvailable,
    sortSelected,
    categoriesSelected,
    removeFilter,
    clearAll,
  }
}
