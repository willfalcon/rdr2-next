import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'request',
  title: 'Request',
  type: 'document',
  fields: [
    defineField({
      name: 'person',
      title: 'Person',
      type: 'string',
      options: {
        list: [
          'Abigail',
          'Jack',
          'Mary-Beth',
          'Javier',
          'Pearson',
          'Sean',
          'Bill',
          'Charles',
          'Hosea',
          'Dutch',
          'Susan',
          'Lenny',
          'Tilly',
          'Molly',
          'Kieran',
          'Sadie',
          'Uncle',
        ],
      },
    }),
    defineField({
      name: 'item',
      title: 'Item',
      type: 'string',
    }),
    defineField({
      name: 'chapter',
      title: 'Chapter',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['2', '3', '4', 'Epilogue Part 2', 'Post Game'],
      },
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'string',
    }),
    defineField({
      name: 'locationDescription',
      title: 'Location Description',
      type: 'string',
    }),
    defineField({
      name: 'locationImage',
      title: 'Location Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      person: 'person',
      item: 'item',
    },
    prepare({ person, item }) {
      return {
        title: `${person}: ${item}`,
      };
    },
  },
});
