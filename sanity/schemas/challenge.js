import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'challenge',
  title: 'Challenge',
  type: 'document',
  fields: [
    defineField({
      name: 'rank',
      title: 'Rank',
      type: 'number',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'reference',
      to: [{ type: 'challengeType' }],
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'string',
    }),
    defineField({
      name: 'reward',
      title: 'Reward',
      type: 'string',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'blockContent',
    }),
    defineField({
      name: 'trackingType',
      title: 'Tracking Type',
      type: 'string',
      options: {
        list: ['counter', 'checklist'],
      },
    }),
    defineField({
      name: 'counter',
      title: 'Counter',
      type: 'number',
      hidden: ({ document }) => document.trackingType !== 'counter',
    }),
    defineField({
      name: 'checklist',
      title: 'Checklist',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ document }) => document.trackingType !== 'checklist',
    }),
  ],
  preview: {
    select: {
      rank: 'rank',
      type: 'type.name',
      challenge: 'challenge',
    },
    prepare({ rank, type, challenge }) {
      return {
        title: `${type} Challenge Tier ${rank}`,
        subtitle: challenge,
      };
    },
  },
});
