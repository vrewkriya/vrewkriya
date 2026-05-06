import { defineType, defineField } from 'sanity'

export const launchEmbeddingSchema = defineType({
  name: 'launchEmbedding',
  title: 'Launch Embedding (About Video)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image to display in the background of the About section. Recommended size: A vertical/portrait image that covers half the screen (e.g. 1000x1200 or any standard high-res image will be auto-scaled).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'includeEmbed',
      title: 'Include Video Embed?',
      type: 'boolean',
      description: 'If true, clicking the thumbnail will open a video player modal. If false, it acts as a static background image.',
      initialValue: false,
    }),
    defineField({
      name: 'embedCode',
      title: 'Embed Code',
      type: 'text',
      description: 'Paste your iframe or embed code here (e.g., YouTube, Vimeo, etc.). Required if "Include Video Embed" is true.',
      hidden: ({ document }) => !document?.includeEmbed,
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.includeEmbed && !value) {
          return 'Embed code is required when "Include Video Embed" is checked.'
        }
        return true
      }),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Set to true to show this embedding on the About section. If multiple are active, the most recently updated one will be used.',
      initialValue: true,
    }),
  ],
})
