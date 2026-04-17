import { SchemaTypeDefinition } from 'sanity'
import { clientSchema } from './client'
import { testimonialSchema } from './testimonial'
import { portfolioSchema } from './portfolio'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioSchema, testimonialSchema, clientSchema],
}
