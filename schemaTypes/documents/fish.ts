import {defineField, defineType} from 'sanity'

/** One fish on the Menu page's "Our fish" grid. */
export const fish = defineType({
  name: 'fish',
  title: 'Menu - Fish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'English name',
      type: 'string',
      description: 'As it appears on the counter, e.g. Blue Fin Tuna Belly.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'jp',
      title: 'Japanese name',
      type: 'string',
      description:
        'How the shop would actually write it — katakana for most species (イカ, ホタテ), kanji only where that is the everyday form (鮭, 鯛).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'romaji',
      title: 'Romaji',
      type: 'string',
      description: 'The reading, shown under the name. e.g. Otoro.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name', maxLength: 60},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Regular sashimi', value: 'regular'},
          {title: 'Seasonal special', value: 'seasonal'},
        ],
        layout: 'radio',
      },
      initialValue: 'regular',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description:
        'Lower numbers come first within the category. Leave gaps (10, 20, 30…) so something can be slotted in later without renumbering everything.',
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Optional. Without one the tile shows a plain block.',
      options: {hotspot: true},
    }),

    // Captured for a future detail view — entered now so the shop isn't asked
    // to revisit 22 documents later.
    defineField({
      name: 'origin',
      title: 'From where',
      type: 'string',
      description: 'e.g. Norway. Not shown on the site yet.',
    }),
    defineField({
      name: 'price',
      type: 'string',
      description:
        'Free text so you can write "market price" as well as "$9 / 100g". Not shown on the site yet.',
    }),
    defineField({
      name: 'description',
      title: 'Tasting note',
      type: 'text',
      rows: 3,
      description: 'Not shown on the site yet.',
    }),
  ],
  orderings: [
    {
      name: 'menuOrder',
      title: 'Menu order',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'sortOrder', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'name', jp: 'jp', category: 'category', media: 'image'},
    prepare: ({title, jp, category, media}) => ({
      title: `${title}${jp ? ` · ${jp}` : ''}`,
      subtitle: category === 'seasonal' ? 'Seasonal special' : 'Regular sashimi',
      media,
    }),
  },
})
