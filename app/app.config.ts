export default defineAppConfig({
  ui: {
    dir: 'rtl',
    card: {
      slots: {
        root: 'border-0 rounded-2xl overflow-hidden',
        header: 'p-4 sm:p-6',
        body: 'p-2 sm:p-2',
        footer: 'p-4 sm:p-6',
      },
    },
  },
})
