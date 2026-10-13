import {defineField, defineType} from 'sanity'

/**
 * A section of the online order list — Nigiri, Rolls, Sets & Trays.
 *
 * Its own document rather than a fixed list in code, so a new section can be
 * added without a deploy. Products point at one of these.
 */
export const productCategory = defineType({
  name: 'productCategory',
  title: 'Online Order - Order Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'English name',
      type: 'string',
      description: 'e.g. Nigiri, Rolls, Sets & Trays.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'jp',
      title: 'Japanese name',
      type: 'string',
      description: 'Shown before the English name, e.g. 握り. Leave empty to show English only.',
    }),
    defineField({
      name: 'note',
      type: 'string',
      description:
        'The small grey line beside the heading, e.g. "2 pieces per order" or "allow up to 45 min prep".',
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
    select: {title: 'title', jp: 'jp', note: 'note'},
    prepare: ({title, jp, note}) => ({
      title: [jp, title].filter(Boolean).join(' · '),
      subtitle: note,
    }),
  },
})
