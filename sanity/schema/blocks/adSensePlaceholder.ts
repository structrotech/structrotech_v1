export const adSensePlaceholderBlock = {
  name: 'adSensePlaceholder',
  title: 'Google Ad Placeholder',
  type: 'object',
  fields: [
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    {
      name: 'format',
      title: 'Ad Format / Size',
      type: 'string',
      description: 'Choose size: Small horizontal banner (same as top/middle/bottom) or medium rectangle.',
      options: {
        list: [
          { title: 'Small Horizontal Banner (728×90 - Default)', value: 'leaderboard' },
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
        format === 'rectangle' ? 'Medium Rectangle (300×250)' : 'Small Horizontal Banner (728×90)'
      return {
        title: 'Google Ad Placeholder',
        subtitle: enabled === false ? 'Disabled' : formatLabel,
      }
    },
  },
}
