import { pageBuilderBlockRefs } from './blocks'
import { bodyImage } from './bodyImage'
import { CategoryInput } from '../components/CategoryInput'

export const trickSchema = {
  name: 'interestingTrick',
  title: 'Interesting Trick',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question / Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'question' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube Video URL (optional)',
      description: 'Paste a YouTube video link (watch, share, or Shorts URL) to feature a video for this trick.',
      type: 'url',
    },
    {
      name: 'excerpt',
      title: 'Short Description (optional)',
      type: 'text',
    },
    {
      name: 'body',
      title: 'Trick Content',
      type: 'array',
      of: [{ type: 'block' }, bodyImage, ...pageBuilderBlockRefs],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'lineSpacing',
      title: 'Line Spacing (Line Height)',
      description: 'Line height for trick text (default: Normal)',
      type: 'string',
      options: {
        list: [
          { title: 'Normal (Default)', value: 'normal' },
          { title: 'Relaxed (Spacious)', value: 'relaxed' },
          { title: 'Loose (Extra spacious)', value: 'loose' },
          { title: 'Tight (Compact)', value: 'tight' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    },
    {
      name: 'letterSpacing',
      title: 'Letter Spacing',
      description: 'Character spacing for trick text (default: Normal)',
      type: 'string',
      options: {
        list: [
          { title: 'Normal (Default)', value: 'normal' },
          { title: 'Wide (Airy)', value: 'wide' },
          { title: 'Tight (Compact)', value: 'tight' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    },
    {
      name: 'category',
      title: 'Category (Pill Badge)',
      description: 'The tag shown on the trick card pill badge (e.g., Windows, Android, Productivity, Shortcuts, Tech). Independent from blog categories.',
      type: 'string',
      components: {
        input: CategoryInput,
      },
    },
    {
      name: 'author',
      title: 'Author (optional)',
      type: 'reference',
      to: [{ type: 'author' }],
      weak: true,
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'linkedPost',
      title: 'Related Blog (optional)',
      type: 'reference',
      to: [{ type: 'post' }],
      weak: true,
    },
    {
      name: 'featuredOnHome',
      title: 'Featured on Home',
      type: 'boolean',
    },
    {
      name: 'homeOrder',
      title: 'Home Order (legacy)',
      type: 'number',
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      description: 'Optional. Lower number appears first (1, 2, 3…) on the Tricks page and homepage. Leave empty to keep the default (newest first) order.',
      type: 'number',
    },
    {
      name: 'popular',
      title: 'Popular',
      type: 'boolean',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    },
    {
      name: 'monetization',
      title: 'Ad Placeholders',
      description:
        'Optional Google Ad placeholders for this trick. Turn each position on or off. Clean placeholders only — no AdSense code yet.',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'adTop', title: 'Show Top Ad', type: 'boolean', initialValue: true },
        { name: 'adMiddle', title: 'Show Middle Ad', type: 'boolean', initialValue: true },
        { name: 'adBottom', title: 'Show Bottom Ad', type: 'boolean', initialValue: true },
      ],
      initialValue: {
        adTop: true,
        adMiddle: true,
        adBottom: true,
      },
    },
    {
      name: 'resources',
      title: 'Resources (download cards - optional)',
      type: 'array',
      of: [{ type: 'downloadCard' }],
    },
    {
      name: 'relatedTricks',
      title: 'Interesting Tricks (pick up to 3)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'interestingTrick' }], weak: true }],
      validation: (Rule: any) => Rule.max(3),
    },
    {
      name: 'relatedBlogs',
      title: 'Related Blogs (pick up to 3)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }], weak: true }],
      validation: (Rule: any) => Rule.max(3),
    },
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
}
