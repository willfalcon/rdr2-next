import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'materialType',
  title: 'Material Type',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
