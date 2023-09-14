import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'item',
  title: 'Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'materials',
      title: 'Materials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'material',
              title: 'Material',
              type: 'reference',
              to: [{ type: 'material' }],
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
            },
          ],
          preview: {
            select: {
              title: 'material.name',
              quantity: 'quantity',
              type: 'material.type.name',
            },
            prepare({ title, quantity, type }) {
              return {
                title: `${quantity} ${title} ${type}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
