export const authorSchema = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'socialHandle',
      title: 'Social ID / Handle (optional)',
      description: "Author's social ID or handle shown below their name (e.g., @john_dev, @alex)",
      type: 'string',
    },
    {
      name: 'socialUrl',
      title: 'Social Profile URL (optional)',
      description: 'Full profile link (e.g. https://twitter.com/username, https://github.com/username, https://linkedin.com/in/username)',
      type: 'url',
    },
    {
      name: 'avatar',
      title: 'Profile Picture (optional)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'bio',
      title: 'Bio (optional)',
      type: 'text',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'socialHandle', media: 'avatar' },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: unknown }) {
      return {
        title: title || 'Author',
        subtitle: subtitle ? (subtitle.startsWith('@') ? subtitle : `@${subtitle}`) : 'No social ID',
        media,
      }
    },
  },
}