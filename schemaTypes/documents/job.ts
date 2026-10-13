import {defineField, defineType} from 'sanity'

/** A posting on the "Work with us" page. */
export const job = defineType({
  name: 'job',
  title: 'Jobs - Job Opening',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'string',
      description: 'e.g. Sushi Chef.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Used in the application link. Click Generate.',
      options: {source: 'title', maxLength: 60},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Department',
      type: 'string',
      description: 'e.g. Kitchen, Counter, Delivery. Shown in the grey line under the title.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'loc',
      title: 'Location',
      type: 'string',
      options: {
        list: ['North York', 'Woodbine', 'Markham'],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Employment type',
      type: 'string',
      options: {list: ['Full-time', 'Part-time', 'Contract', 'Seasonal']},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      description: 'The paragraph at the top of the expanded posting.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'responsibilities',
      title: "What you'll do",
      type: 'array',
      of: [{type: 'string'}],
      description: 'One bullet per line. Four or five reads best.',
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'requirements',
      title: "What we're looking for",
      type: 'array',
      of: [{type: 'string'}],
      description: 'One bullet per line.',
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first. Leave gaps (10, 20, 30…).',
    }),
  ],
  orderings: [
    {name: 'listOrder', title: 'List order', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', loc: 'loc', type: 'type'},
    prepare: ({title, loc, type}) => ({
      title,
      subtitle: [loc, type].filter(Boolean).join(' · '),
    }),
  },
})
