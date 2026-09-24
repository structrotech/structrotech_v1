export const dividerBlock = {
  name: 'divider',
  title: 'Horizontal Line / Divider',
  type: 'object',
  fields: [
    {
      name: 'tone',
      title: 'Line Tone & Darkness',
      type: 'string',
      description: 'Choose line intensity and darkness: normal dark, bold dark, or minimal visible line.',
      options: {
        list: [
          { title: 'Normal Dark (Balanced & Clearly Visible - Default)', value: 'normal' },
          { title: 'Dark (Bold & High Contrast)', value: 'dark' },
          { title: 'Minimal (Clean & Subtle, Visible)', value: 'minimal' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    },
    {
      name: 'style',
      title: 'Line Style',
      type: 'string',
      description: 'Visual pattern of the horizontal line',
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
    {
      name: 'thickness',
      title: 'Thickness',
      type: 'string',
      description: 'Stroke thickness for the divider',
      options: {
        list: [
          { title: 'Standard (1px)', value: '1' },
          { title: 'Medium (2px)', value: '2' },
          { title: 'Thick (3px)', value: '3' },
        ],
        layout: 'radio',
      },
      initialValue: '1',
    },
  ],
  preview: {
    select: { style: 'style', tone: 'tone' },
    prepare({ style, tone }: { style?: string; tone?: string }) {
      return {
        title: 'Horizontal Line (Divider)',
        subtitle: `${tone || 'normal dark'} tone • ${style || 'solid'} style`,
      }
    },
  },
}
