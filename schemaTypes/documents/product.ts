import {defineField, defineType} from 'sanity'

/** One orderable item on the Online Order page. */
export const product = defineType({
  name: 'product',
  title: 'Online Order - Order Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'English name',
      type: 'string',
      description: 'e.g. Maguro, California Roll.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'jp',
      title: 'Japanese name',
      type: 'string',
      description: 'Shown in small grey type under the name, e.g. マグロ. Optional.',
    }),
    defineField({
      name: 'category',
      title: 'Section',
      type: 'reference',
      to: [{type: 'productCategory'}],
      description: 'Which part of the order list this appears under.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
      description:
        'The short line under the name — what is in it, as the in-store menu board puts it. e.g. "Avocado, Cucumber, Kanikama, Tobiko".',
    }),
    defineField({
      name: 'price',
      type: 'number',
      description:
        'In dollars, numbers only — 8.5 shows as $8.50. Unlike the Menu page, this one has to be a number so the cart can add it up.',
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description:
        'Landscape works best — the tile is wider than it is tall. Without one the item shows a plain block.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first within the section. Leave gaps (10, 20, 30…).',
    }),
  ],
  orderings: [
    {name: 'listOrder', title: 'List order', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],
  preview: {
    select: {name: 'name', jp: 'jp', price: 'price', category: 'category.title', media: 'image'},
    prepare: ({name, jp, price, category, media}) => ({
      title: [name, jp].filter(Boolean).join(' · '),
      subtitle: [category, typeof price === 'number' ? `$${price.toFixed(2)}` : null]
        .filter(Boolean)
        .join(' — '),
      media,
    }),
  },
})
