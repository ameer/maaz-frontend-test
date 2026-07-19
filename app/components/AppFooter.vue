<script lang="ts" setup>
const { public: { appName } } = useRuntimeConfig()

const quickAccess: MenuLink[] = [
  { label: 'درباره ما', to: '#' },
  { label: 'بلاگ', to: '#' },
  { label: 'تماس با ما', to: '#' },
  { label: 'خدمات پس از فروش', to: '#' },
]

const siteGuide: MenuLink[] = [
  { label: 'قوانین و مقررات', to: '#' },
  { label: 'دریافت مشاوره', to: '#' },
  { label: 'انتقادات و پیشنهادها', to: '#' },
]

const socialLinksWithText: SocialLink[] = [
  {
    label: 'تلگرام',
    link: 'https://telegram.com',
    icon: 'i-custom-telegram',
  },
  {
    label: 'اینستاگرام',
    link: 'https://instagram.com',
    icon: 'i-custom-instagram',
  },
  {
    label: 'لینکدین',
    link: 'https://linkedin.com',
    icon: 'i-custom-linkedin',
  },
]
const socialIcons: SocialLink[] = [
  {
    label: 'لینکدین',
    link: 'https://linkedin.com',
    icon: 'i-custom-linkedin',
  },
  {
    label: 'یوتوب',
    link: 'https://youtube.com',
    icon: 'i-custom-youtube',
  },
  {
    label: 'توییتر',
    link: 'https://twitter.com',
    icon: 'i-custom-twitter',
  },
  {
    label: 'اینستاگرام',
    link: 'https://instagram.com',
    icon: 'i-custom-instagram',
  },
  {
    label: 'تلگرام',
    link: 'https://telegram.com',
    icon: 'i-custom-telegram',
  },
]
</script>

<template>
  <footer class="font-bakh">
    <!-- Top Section -->
    <div class="bg-white pt-16 pb-12">
      <div class="layout-container mx-auto flex items-center gap-30 w-full">
        <!-- Col 1 (Right): Text and maybe logo -->
        <div class="mt-32 hidden md:block">
          <p class="text-slate-600 text-[13px] font-medium text-nowrap">
            هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 justify-between w-full gap-x-16.25 gap-y-17 md:gap-x-30 md:gap-y-0">
          <!-- Col 2 (Center Right): Quick Access -->
          <FooterMenu menu-title="دسترسی سریع">
            <NuxtLink
              v-for="(qaLink, i) in quickAccess"
              :key="`qa-${i}`"
              :to="qaLink.to"
              class="text-slate-600 hover:text-slate-900 transition-colors text-[13px] font-medium"
            >
              {{ qaLink.label }}
            </NuxtLink>
          </FooterMenu>

          <!-- Col 3 (Center Left): Site Guide -->
          <FooterMenu :menu-title="'راهنمای سایت'">
            <NuxtLink
              v-for="(guide, i) in siteGuide"
              :key="`sg-${i}`"
              :to="guide.to"
              class="text-slate-600 hover:text-slate-900 transition-colors text-[13px] font-medium"
            >
              {{ guide.label }}
            </NuxtLink>
          </FooterMenu>
          <!-- Col 4 (Left): Socials -->
          <FooterMenu :menu-title="'شبکه‌های اجتماعی'">
            <a
              v-for="(social, i) in socialLinksWithText"
              :key="`sl-${i}`"
              :href="social.link"
              target="_blank"
              rel="nofollow"
              class="flex items-center gap-4 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <UIcon
                :name="social.icon || 'i-custom-telegram'"
                class="w-6 h-6"
              />
              <span class="font-medium text-sm">{{ social.label }}</span>

            </a>
          </FooterMenu>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="bg-[#F8F9FC] pt-12 pb-12 px-4 lg:px-8">
      <div class="layout-container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        <!-- Right Side: Spacer (Used to keep the center block perfectly in the middle on desktop) -->
        <div class="hidden lg:block min-w-54" />

        <!-- Center: Copyright & Socials -->
        <div class="flex flex-col items-center space-y-7 flex-1">
          <p class="text-[#334155] text-center text-[13px] font-bold leading-6 max-w-[320px]">
            تمامی حقوق مادی و معنوی این وبسایت متعلق به {{ appName }} می‌باشد و هر گونه کپی برداری پیگرد قانونی دارد.
          </p>

          <!-- Social Icons -->
          <div class="flex items-center justify-center gap-4">
            <!-- Telegram -->
            <a
              v-for="(social, i) in socialIcons"
              :key="`social-link-${i}`"
              :href="social.link"
            >
              <UIcon
                :name="social.icon"
                class="w-6 h-6 text-primary-200 hover:text-primary-500 transition-colors"
              />
            </a>
          </div>
        </div>

        <!-- Left Side: Trust Seals (ENAMAD & Samandehi) -->
        <div class="flex items-center justify-end gap-5 min-w-54">
          <!-- Samandehi -->
          <div class="w-18 h-18 bg-white rounded-[6px] shadow-sm flex items-center justify-center p-2.5">
            <img
              src="/images/samandehi.png"
              alt="ساماندهی"
              class="w-full h-full object-contain"
              loading="lazy"
            >
          </div>
          <!-- ENAMAD -->
          <div class="w-18 h-18 bg-white rounded-[6px] shadow-sm flex items-center justify-center p-2.5">
            <img
              src="/images/enamad.png"
              alt="اینماد"
              class="w-full h-full object-contain"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
