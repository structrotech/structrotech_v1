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
        name: 'avatar',
        title: 'Profile Picture',
        type: 'image',
        options: { hotspot: true },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'text',
      }
    ],
    preview: {
      select: { title: 'name', subtitle: 'bio', media: 'avatar' },
    },
  }