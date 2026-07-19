// app/composables/useProducts.ts

import { useRuntimeConfig, useFetch } from '#imports'
import { transformProduct, type FakeStoreProduct } from '~/utils/productAdapter'

export const useProducts = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  /**
   * Fetches the entire product catalog
   * @param mode - 'pindoor' (default) for UI format, or 'raw' for exact API payload
   */
  const fetchAllProducts = async (mode: 'raw' | 'pindoor' = 'pindoor') => {
    return await useFetch<FakeStoreProduct[]>('/products', {
      baseURL,
      // Intercept the response and run it through our adapter
      transform: products => products.map(product => transformProduct(product, mode)),
    })
  }

  /**
   * Fetches a single product for the PDP (Product Detail Page)
   * @param id - The ID of the product
   * @param mode - 'pindoor' (default) for UI format, or 'raw' for exact API payload
   */
  const fetchProductById = async (id: number | string, mode: 'raw' | 'pindoor' = 'pindoor') => {
    return await useFetch<FakeStoreProduct>(`/products/${id}`, {
      baseURL,
      // Intercept the response and run it through our adapter
      transform: product => transformProduct(product, mode),
    })
  }

  return {
    fetchAllProducts,
    fetchProductById,
  }
}
