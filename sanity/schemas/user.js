import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'hash',
      title: 'Hash',
      type: 'string',
    }),
    defineField({
      name: 'salt',
      title: 'Salt',
      type: 'string',
    }),
    defineField({
      name: 'store',
      title: 'Store',
      type: 'text',
    }),
    defineField({
      name: 'resetToken',
      title: 'Reset Token',
      type: 'string',
    }),
    defineField({
      name: 'resetTokenExpiry',
      title: 'Reset Token Expiry',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'email',
    },
  },
});
