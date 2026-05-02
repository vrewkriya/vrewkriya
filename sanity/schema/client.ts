export const clientSchema = {
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Order (optional for sorting)',
      type: 'number',
    },
    {
      name: 'width',
      title: 'Image Width (px)',
      type: 'number',
      description: 'Optional custom width for the client logo (default is 180)',
    },
    {
      name: 'height',
      title: 'Image Height (px)',
      type: 'number',
      description: 'Optional custom height for the client logo (default is 180)',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
}
