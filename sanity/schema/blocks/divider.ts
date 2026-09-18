export const dividerBlock = {
  name: 'divider',
  title: 'Horizontal Line / Divider',
  type: 'object',
  fields: [
    {
      name: 'style',
      title: 'Line Style',
      type: 'string',
      description: 'Visual style of the horizontal rule',
      options: {
        list: [
          { title: 'Solid Line (Default)', value: 'solid' },
          { title: 'Dashed Line', value: 'dashed' },
          { title: 'Dotted Line', value: 'dotted' },
        ],
        layout: 'radio',
      },
      initialValue: 'solid',
    },
  ],
  preview: {
    select: { style: 'style' },
    prepare({ style }: { style?: string }) {
      return {
        title: 'Horizontal Line (Divider)',
        subtitle: style ? `Style: ${style}` : 'Solid Line',
      }
    },
  },
}
