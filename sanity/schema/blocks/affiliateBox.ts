export const affiliateBoxBlock = {
  name: 'affiliateBox',
  title: 'Affiliate Box',
  type: 'object',
  fields: [
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    { name: 'productName', title: 'Product Name', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Learn More' },
    { name: 'url', title: 'URL', type: 'url' },
    { name: 'badge', title: 'Badge', type: 'string' },
  ],
  preview: {
    select: { title: 'productName', enabled: 'enabled', media: 'image' },
    prepare({ title, enabled, media }: { title?: string; enabled?: boolean; media?: object }) {
      return {
        title: title ? `Affiliate Box — ${title}` : 'Affiliate Box',
        subtitle: enabled === false ? 'Disabled' : 'Enabled',
        media,
      }
    },
  },
}
