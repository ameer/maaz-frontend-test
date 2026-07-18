export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}


export interface PindoorProduct {
  id: number;
  name: string;
  title: string;
  price: number;
  description: string;
  specs: string[];
  category: string;
  rank: number;
  count: number;
  image: string;
  rating: { rate: number; count: number };
}

const categoryMap: Record<string, string> = {
  "electronics": "صنعتی و کارخانه‌ای",
  "jewelery": "بهداشتی و درمانی",
  "men's clothing": "مسکونی و اداری",
  "women's clothing": "مسکونی و اداری",
};

const pindoorTitles = [
  "درب اتوماتیک شیشه‌ای تلسکوپی پیندُر",
  "درب اتوماتیک کشویی مدل آلفا",
  "درب اتوماتیک شیشه‌ای تاشو لولایی",
  "درب صنعتی اتوماتیک رول‌آپ سریع",
  "درب لولایی هوشمند تک لنگه بیمارستانی"
];

export function transformProduct(
  raw: FakeStoreProduct,
  mode: 'raw' | 'pindoor' = 'pindoor'
): FakeStoreProduct | PindoorProduct {
  
  if (mode === 'raw') {
    return raw;
  }

  const simulatedPrice = Math.round(raw.price * 280000); 

  return {
    id: raw.id,
    name: pindoorTitles[raw.id % pindoorTitles.length]!,
    title: raw.title,
    price: simulatedPrice,
    description: raw.description,
    specs: [
      "مجهز به سنسور تشخیص مانع التراسونیک",
      "سیستم توقف اضطراری خودکار",
      "امکان اتصال به سیستم‌های هوشمند ساختمان (BMS)"
    ],
    category: categoryMap[raw.category] || "مسکونی و اداری",
    rank: raw.rating.rate,
    count: raw.rating.count,
    image: raw.image,
    rating: raw.rating
  };
}