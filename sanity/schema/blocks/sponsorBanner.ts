export const sponsorBannerBlock = {
  name: 'sponsorBanner',
  title: 'Sponsor Banner',
  type: 'object',
  fields: [
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    { name: 'brandName', title: 'Brand Name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
    { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Visit' },
    { name: 'url', title: 'URL', type: 'url' },
  ],
  preview: {
    select: { title: 'brandName', enabled: 'enabled', media: 'logo' },
    prepare({ title, enabled, media }: { title?: string; enabled?: boolean; media?: object }) {
      return {
        title: title ? `Sponsor Banner — ${title}` : 'Sponsor Banner',
        subtitle: enabled === false ? 'Disabled' : 'Enabled',
        media,
      }
    },
  },
}
