export const youtubeBlock = {
  name: 'youtube',
  title: 'YouTube Video',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Paste any YouTube video link (watch link, share link, or Shorts URL)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption (optional)',
      type: 'string',
      description: 'Optional brief caption or title displayed beneath the video',
    },
  ],
  preview: {
    select: { url: 'url', caption: 'caption' },
    prepare({ url, caption }: { url?: string; caption?: string }) {
      return {
        title: caption || 'YouTube Video',
        subtitle: url || 'No URL specified',
      }
    },
  },
}
