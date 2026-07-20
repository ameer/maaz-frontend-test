declare global {
  interface HeaderMenuLink {
    label: string
    to: string
    icon: string
  }
  interface MenuLink {
    label: string
    to: string
  }
  interface SocialLink {
    label: string
    link: string
    icon: string
  }
  interface ActiveFilter {
    title: string
    icon: string
    value: string
  }
  interface ProductInfoRow {
    t: string
    suffix?: string
    f?: (v: never) => unknown
  }
  interface ProductInfoConfig {
    [key: string]: ProductInfoRow
  }
}
