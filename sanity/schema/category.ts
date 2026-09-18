export const categorySchema = {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Category Name',
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
        name: 'image',
        title: 'Cover Image',
        type: 'image',
        options: { hotspot: true }
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'articleCount',
        title: 'Article Count',
        type: 'number',
      },
      {
        name: 'tag',
        title: 'Tag',
        type: 'string',
        options: {
          list: ['Tech','AI','Cybersecurity','Cloud','DevOps','Web']
        }
      },
      {
        name: 'displayOrder',
        title: 'Display Order',
        description: 'Optional. Lower number appears first (1, 2, 3…). Leave empty to keep the default order.',
        type: 'number',
      }
    ],
    preview: {
      select: { title: 'title', subtitle: 'tag', media: 'image' },
    },
  }