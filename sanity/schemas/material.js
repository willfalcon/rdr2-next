import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'material',
  title: 'Material',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'reference',
      to: [{ type: 'materialType' }],
    }),
    defineField({
      name: 'legendary',
      title: 'Legendary',
      type: 'boolean',
    }),
    defineField({
      name: 'weapons',
      title: 'Weapons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'weapon', title: 'Weapon', type: 'reference', to: [{ type: 'weapon' }] },
            { name: 'ammo', title: 'Ammo', type: 'reference', to: [{ type: 'ammo' }] },
          ],
          preview: {
            select: {
              weapon: 'weapon.name',
              ammo: 'ammo.name',
            },
            prepare({ weapon, ammo }) {
              return { title: `${weapon}${ammo ? ` with ${ammo}` : ''}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [{ name: 'map', title: 'Map', type: 'image' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type.name',
    },
    prepare(selection) {
      const { title, type } = selection;

      return {
        title: `${title} ${type}`,
      };
    },
  },
});
