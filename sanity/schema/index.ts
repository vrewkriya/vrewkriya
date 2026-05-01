import { SchemaTypeDefinition } from 'sanity'
import { clientSchema } from './client'
import { testimonialSchema } from './testimonial'
import { portfolioSchema } from './portfolio'
import { inquirySchema } from './inquiry'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioSchema, testimonialSchema, clientSchema, inquirySchema],
}
