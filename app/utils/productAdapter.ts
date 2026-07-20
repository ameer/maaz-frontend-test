import { translations } from './translations'

export interface FakeStoreProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface PindoorProduct extends FakeStoreProduct {
  id: number
  name: string
  title: string
  price: number
  description: string
  specs: string[]
  category: string
  rank: number
  count: number
  image: string
  rating: { rate: number, count: number }
}

export function transformProduct(raw: FakeStoreProduct, mode?: 'pindoor'): PindoorProduct

// 2. Overload for exactly 'raw'
export function transformProduct(raw: FakeStoreProduct, mode: 'raw'): FakeStoreProduct

// 3. NEW: Overload to accept the dynamic union type from our useProducts wrapper
export function transformProduct(raw: FakeStoreProduct, mode: 'raw' | 'pindoor'): FakeStoreProduct | PindoorProduct

// 4. The hidden implementation
export function transformProduct(
  raw: FakeStoreProduct,
  mode: 'raw' | 'pindoor' = 'pindoor',
): FakeStoreProduct | PindoorProduct {
  if (mode === 'raw') {
    return { ...raw, ...raw.rating }
  }

  const simulatedPrice = Math.round(raw.price * 280000)

  return {
    id: raw.id,
    title: translations[raw.title as keyof typeof translations] || raw.title,
    price: simulatedPrice,
    description: translations[raw.description as keyof typeof translations] || raw.description,
    specs: [
      'مجهز به سنسور تشخیص مانع التراسونیک',
      'سیستم توقف اضطراری خودکار',
      'امکان اتصال به سیستم‌های هوشمند ساختمان (BMS)',
    ],
    category: translations[raw.category as keyof typeof translations] || 'نامشخص',
    rank: raw.rating.rate,
    count: raw.rating.count,
    image: raw.image,
    rating: raw.rating,
  }
}
