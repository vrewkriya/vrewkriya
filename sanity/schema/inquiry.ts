import { defineField, defineType } from 'sanity'

export const inquirySchema = defineType({
  name: 'inquiry',
  title: 'Consultation Inquiries',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    }),
    defineField({
      name: 'brand',
      title: 'Brand / Company',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Mobile Number',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
  ],
})
