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
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
}
