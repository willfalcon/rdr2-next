import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ammo',
  title: 'Ammo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
