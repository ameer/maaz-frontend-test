<script lang="ts" setup>
import { useRuntimeConfig } from '#app'

const { public: { appName } } = useRuntimeConfig()

// Data structure preserved from original component[cite: 9]
const quickAccess = [
  { label: 'درباره ما', to: '#' },
  { label: 'بلاگ', to: '#' },
  { label: 'تماس با ما', to: '#' },
  { label: 'خدمات پس از فروش', to: '#' },
]

const siteGuide = [
  { label: 'قوانین و مقررات', to: '#' },
  { label: 'دریافت مشاوره', to: '#' },
  { label: 'انتقادات و پیشنهادها', to: '#' },
]

const socialLinksWithText = [
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

const socialIcons = [
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
  <footer
    class="font-bakh w-full"
    dir="rtl"
  >
    <!-- Top Section -->
    <div class="bg-white pt-16 pb-12">
      <div class="mx-auto w-full max-w-360 px-4 md:px-20 xl:px-41">
        <div class="flex">
          <!-- Col 1: Text Info -->
          <div class="hidden lg:flex lg:pl-30 xl:pl-35 grow shrink-0 flex-col justify-end">
            <p class="text-[#30445B] text-[13px] font-medium mt-auto pb-1.5">
              هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم
            </p>
          </div>

          <div class="flex flex-wrap lg:flex-nowrap gap-y-17 lg:gap-y-0 justify-between w-full px-9 lg:px-0">
            <!-- Col 2: Quick Access -->
            <div class="flex flex-col items-start space-y-4">
              <FooterMenu menu-title="دسترسی سریع">
                <NuxtLink
                  v-for="(qaLink, i) in quickAccess"
                  :key="`qa-${i}`"
                  :to="qaLink.to"
                  class="text-[#30445B] hover:text-slate-900 transition-colors text-[13px] font-medium"
                >
                  {{ qaLink.label }}
                </NuxtLink>
              </FooterMenu>
            </div>

            <!-- Col 3: Site Guide -->
            <div class="flex flex-col items-start space-y-4">
              <FooterMenu :menu-title="'راهنمای سایت'">
                <NuxtLink
                  v-for="(guide, i) in siteGuide"
                  :key="`sg-${i}`"
                  :to="guide.to"
                  class="text-[#30445B] hover:text-slate-900 transition-colors text-[13px] font-medium"
                >
                  {{ guide.label }}
                </NuxtLink>
              </FooterMenu>
            </div>

            <!-- Col 4: Socials -->
            <div class="flex flex-col items-start space-y-4">
              <FooterMenu :menu-title="'شبکه‌های اجتماعی'">
                <a
                  v-for="(social, i) in socialLinksWithText"
                  :key="`sl-${i}`"
                  :href="social.link"
                  target="_blank"
                  rel="nofollow"
                  class="flex items-center gap-4 text-[#6783A0] hover:text-slate-700 transition-colors"
                >
                  <UIcon
                    :name="social.icon || 'i-custom-telegram'"
                    class="w-6 h-6"
                  />
                  <span class="font-medium text-sm text-[#253343]">{{ social.label }}</span>

                </a>
              </FooterMenu>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="bg-[#F8F9FC] pt-12 pb-12 px-4 lg:px-8">
      <div class="mx-auto w-full max-w-360 px-4 md:px-20 xl:px-41">
        <div class="flex flex-col md:flex-row items-center justify-between gap-10">
          <!-- Right Side: Spacer (Exactly balances out the Left Side seals) -->
          <div class="hidden md:block w-45 lg:w-55" />

          <!-- Center: Copyright & Socials -->
          <div class="flex flex-col items-center space-y-6 flex-1">
            <p class="text-[#445A74] text-center text-[13px] font-bold leading-7 md:leading-6 max-w-85">
              تمامی حقوق مادی و معنوی این وبسایت متعلق به {{ appName }} می‌باشد و هر گونه کپی برداری پیگرد قانونی دارد.
            </p>

            <!-- Bottom Social Icons: Styled as circular filled buttons[cite: 9] -->
            <div class="flex items-center justify-center gap-3">
              <a
                v-for="(social, i) in socialIcons"
                :key="`social-link-${i}`"
                :href="social.link"
                target="_blank"
                rel="nofollow"
                aria-label="Social link"
                class="flex items-center justify-center"
              >
                <UIcon
                  :name="social.icon"
                  class="w-6 h-6 text-[#f472b6] hover:text-primary-500 transition-colors"
                />
              </a>
            </div>
          </div>

          <!-- Left Side: Trust Seals (ENAMAD & Samandehi) -->
          <!-- Fixed width constraint matches right side spacer for center alignment -->
          <div class="flex items-center justify-center md:justify-end gap-4 md:gap-5 w-full md:w-45 lg:w-55">
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
    </div>
  </footer>
</template>
