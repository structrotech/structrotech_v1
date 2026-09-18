export const resourceSchema = {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['Roadmaps', 'Cheatsheets', 'Notes', 'Guides', 'Tools'],
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Description', type: 'text' },
    {
      name: 'downloadUrl',
      title: 'Download URL',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    },
  ],
}
