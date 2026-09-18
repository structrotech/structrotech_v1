import { pageBuilderBlockRefs } from './blocks'
import { bodyImage } from './bodyImage'

export const postSchema = {
    name: 'post',
    title: 'Blog Post',
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
        name: 'coverImage',
        title: 'Cover Image',
        type: 'image',
        options: { hotspot: true },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'excerpt',
        title: 'Short Description',
        type: 'text',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'body',
        title: 'Blog Content',
        type: 'array',
        of: [{ type: 'block' }, bodyImage, ...pageBuilderBlockRefs],
        validation: (Rule: any) => Rule.required().min(1),
      },
      {
        name: 'lineSpacing',
        title: 'Line Spacing (Line Height)',
        description: 'Line height for blog text (default: Normal)',
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
        description: 'Character spacing for blog text (default: Normal)',
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
        title: 'Category',
        type: 'reference',
        to: [{ type: 'category' }],
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'author' }],
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'publishedAt',
        title: 'Published Date',
        type: 'datetime',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'readTime',
        title: 'Read Time (mins)',
        type: 'number',
      },
      {
        name: 'featured',
        title: 'Featured Post',
        type: 'boolean',
      },
      {
        name: 'displayOrder',
        title: 'Display Order',
        description: 'Optional. Lower number appears first (1, 2, 3…). Leave empty to keep the default (newest first) order.',
        type: 'number',
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
          'Optional Google Ad placeholders for this post. Turn each position on or off. Clean placeholders only — no AdSense code yet.',
        type: 'object',
        options: { collapsible: true, collapsed: false },
        fields: [
          { name: 'adTop', title: 'Show Top Ad', type: 'boolean', initialValue: false },
          { name: 'adMiddle', title: 'Show Middle Ad', type: 'boolean', initialValue: false },
          { name: 'adBottom', title: 'Show Bottom Ad', type: 'boolean', initialValue: false },
        ],
      },
      {
        name: 'resources',
        title: 'Resources (download cards)',
        type: 'array',
        of: [{ type: 'downloadCard' }],
      },
      {
        name: 'relatedTricks',
        title: 'Interesting Tricks (pick up to 3)',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'interestingTrick' }] }],
        validation: (Rule: any) => Rule.max(3),
      },
      {
        name: 'relatedBlogs',
        title: 'Related Blogs (pick up to 3)',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'post' }] }],
        validation: (Rule: any) => Rule.max(3),
      }
    ],
    preview: {
      select: { title: 'title', subtitle: 'category.title', media: 'coverImage' },
    },
  }