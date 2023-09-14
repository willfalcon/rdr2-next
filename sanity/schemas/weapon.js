import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'weapon',
  title: 'Weapon',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
