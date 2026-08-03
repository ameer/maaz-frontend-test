import { useRuntimeConfig, useFetch } from '#imports'
import { transformProduct, type FakeStoreProduct, type PindoorProduct } from '~/utils/productAdapter'

export const useProducts = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  /**
   * Fetches the entire product catalog
   * @param mode - 'pindoor' (default) for UI format, or 'raw' for exact API payload
   */
  const fetchAllProducts = <T extends 'raw' | 'pindoor' = 'pindoor'>(mode: T = 'pindoor' as T) => {
    return useFetch('/products', {
      baseURL,
      key: `products-all-${mode}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      transform: (products: FakeStoreProduct[]) => {
        const transformed = products.map(product => transformProduct(product, mode))
        return transformed as T extends 'raw' ? FakeStoreProduct[] : PindoorProduct[]
      },
    })
  }

  /**
   * Fetches a single product for the PDP (Product Detail Page)
   * @param id - The ID of the product
   * @param mode - 'pindoor' (default) for UI format, or 'raw' for exact API payload
   */
  const fetchProductById = <T extends 'raw' | 'pindoor' = 'pindoor'>(id: number | string, mode: T = 'pindoor' as T) => {
    return useFetch(`/products/${id}`, {
      baseURL,
      key: `product-${id}-${mode}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      transform: (product: FakeStoreProduct) => {
        return transformProduct(product, mode) as T extends 'raw' ? FakeStoreProduct : PindoorProduct
      },
    })
  }

  return {
    fetchAllProducts,
    fetchProductById,
  }
}
