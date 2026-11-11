import {defineField, defineType} from 'sanity'

/**
 * A day, or run of days, a store is closed outside its usual hours.
 *
 * The online order page stops offering these days for pickup and tells the
 * customer why. Old entries can be left in place: a closure that has ended
 * no longer affects anything.
 */
export const closure = defineType({
  name: 'closure',
  title: 'Online Order - Closed Dates',
  type: 'document',
  fields: [
    defineField({
      name: 'reason',
      type: 'string',
      description:
        'Shown to customers on the order page, e.g. "Christmas" or "Staff holiday". Keep it short.',
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: 'stores',
      title: 'Which stores',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'North York', value: 'northyork'},
          {title: 'Woodbine', value: 'woodbine'},
          {title: 'Markham', value: 'markham'},
        ],
        layout: 'grid',
      },
      description: 'Tick every store that is closed. Tick all three for a holiday.',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'start',
      title: 'First closed day',
      type: 'date',
      options: {dateFormat: 'ddd, MMM D, YYYY'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'end',
      title: 'Last closed day',
      type: 'date',
      options: {dateFormat: 'ddd, MMM D, YYYY'},
      description: 'Leave empty if it is a single day.',
      validation: (r) =>
        r.custom((end, ctx) => {
          const start = (ctx.document as {start?: string} | undefined)?.start
          if (!end || !start) return true
          return end >= start ? true : 'The last closed day cannot be before the first.'
        }),
    }),
  ],
  orderings: [{name: 'byDate', title: 'Date', by: [{field: 'start', direction: 'desc'}]}],
  preview: {
    select: {reason: 'reason', start: 'start', end: 'end', stores: 'stores'},
    prepare: ({reason, start, end, stores}) => ({
      title: reason,
      subtitle: [
        end && end !== start ? `${start} → ${end}` : start,
        Array.isArray(stores) && stores.length === 3 ? 'All stores' : (stores ?? []).join(', '),
      ]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
