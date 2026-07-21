export const adSensePlaceholderBlock = {
  name: 'adSensePlaceholder',
  title: 'Google Ad Placeholder',
  type: 'object',
  fields: [
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    {
      name: 'format',
      title: 'Ad Format',
      type: 'string',
      description: 'Placeholder size only — no AdSense code is injected yet.',
      options: {
        list: [
          { title: 'Leaderboard (728×90)', value: 'leaderboard' },
          { title: 'Medium Rectangle (300×250)', value: 'rectangle' },
        ],
        layout: 'radio',
      },
      initialValue: 'leaderboard',
    },
  ],
  preview: {
    select: { format: 'format', enabled: 'enabled' },
    prepare({ format, enabled }: { format?: string; enabled?: boolean }) {
      const formatLabel =
        format === 'rectangle' ? 'Medium Rectangle (300×250)' : 'Leaderboard (728×90)'
      return {
        title: 'Google Ad Placeholder',
        subtitle: enabled === false ? 'Disabled' : formatLabel,
      }
    },
  },
}
