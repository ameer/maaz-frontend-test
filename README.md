# Maaz Frontend Test

A high-performance, Server-Side Rendered (SSR) e-commerce storefront built with Nuxt, Vue 3, and TypeScript. This project integrates with a mock product API, adapting raw data into a localized, user-friendly interface with advanced filtering, dynamic sorting, and optimized data fetching.

## ✨ Features

- **Server-Side Rendering (SSR)** – Optimized for performance, SEO, and fast initial page loads using Nuxt best practices
- **Advanced Product Filtering & Sorting** – Real-time search, category filtering, availability toggle, and dynamic sorting
- **URL-Driven State Management** – All filters are reflected in the URL for shareable, bookmarkable experiences
- **Pixel-Perfect UI Implementation** – Faithful recreation of the provided Figma design with attention to detail
- **Accessibility (a11y)** – Built with semantic markup, proper focus management, keyboard navigation, and ARIA labels
- **Fully Responsive & RTL-First** – Optimized for Persian language and right-to-left layout
- **Optimized Performance** – Lazy-loaded images with `NuxtImg`, efficient client-side filtering, and smooth transitions
- **Type Safety** – Comprehensive TypeScript coverage across components, composables, and data layers

## 🚀 Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3 + Nitro)
- **Language**: TypeScript
- **UI Library**: [Nuxt UI](https://ui.nuxt.com/)
- **Styling**: Tailwind CSS v4
- **Images**: `@nuxt/image`
- **Icons**: Nuxt Icon + Custom SVG Collection
- **API**: Fake Store API + Data Adapter Pattern

## 🎯 Technical Decisions

- **Data** Layer: Custom adapter to transform Fake Store API data into a localized, UI-friendly format
- **State** Management: URL-driven filters using Vue Router + Composables
- **Performance**: Client-side filtering after initial SSR load
- **Maintainability**: Clean separation of concerns and reusable components
- **Accessibility** & UX: Proper focus management, keyboard navigation, and loading states

## 📦 Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/ameer/maaz-frontend-test.git
cd maaz-frontend-test
```
**2. Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```
**3. Environment Configuration**
Create a `.env` file in the root directory and define your API base URL:
```
NUXT_PUBLIC_API_BASE_URL=https://fakestoreapi.com
```
**4. Run the development server**
```bash
npm run dev
```
The application will be available at `http://localhost:3000` .

## 📁 Project Structure
```bash
app/
├── components/
│   ├── filters/          # FilterBox, ActiveFilters, Sidebar, etc.
│   └── products/         # ProductCard, ProductDetailHero, etc.
├── composables/
│   ├── useProductFilters.ts
│   └── useProducts.ts
├── utils/
│   ├── productAdapter.ts
│   └── translations.ts
├── pages/
│   ├── products/
│   └── index.vue
└── assets/
```

## 🛠️ Build for Production
To build the application for a production environment:
```bash
npm run build
```
You can then preview the production build locally:
```bash
npm run preview
```