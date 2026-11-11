import {defineField, defineType} from 'sanity'

/**
 * A tile in the homepage "What we make" grid.
 *
 * Four of these shipped hard-coded in the page itself, which meant adding a
 * fifth — or dropping one for a season — needed a developer. They are now
 * documents, ordered by `sortOrder`, and the grid takes however many there
 * are: it is an auto-fit grid, so three or six lay out as happily as four.
 *
 * Every tile links to the Menu page. That is the same for all of them, so it
 * stays in the markup rather than becoming a field nobody would ever change.
 */
export const homeCategory = defineType({
  name: 'homeCategory',
  title: 'Homepage - What We Make',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description:
        'Shown in a 3:2 frame. Drag the crop handle to set what stays in view when it is trimmed to fit.',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. Fresh Fish, Rolls, Nigiri.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'jp',
      title: 'Japanese name',
      type: 'string',
      description: 'Shown in small grey type under the title, e.g. 鮮魚. Leave empty to show English only.',
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 2,
      description:
        'A sentence or two under the title. Keep it short — it sits in a narrow column beside the other tiles.',
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description:
        'Where the tile goes when clicked — a page on this site such as /order, /menu#our-fish or /contact#catering, a full https:// address for somewhere else, or mailto:info@tarosfish.com to open an email. Leave it empty and the tile is not clickable.',
      validation: (r) =>
        r.custom((value) => {
          if (!value) return true
          if (typeof value !== 'string') return true
          // A leading slash means this site. Two of them is a link to another
          // domain wearing a path's clothes, so it has to say https:// openly.
          const internal = /^\/(?![/\\])/.test(value)
          const external = /^https?:\/\//.test(value)
          const email = /^mailto:[^@\s]+@[^@\s]+$/.test(value)
          return internal || external || email
            ? true
            : 'Start with / for a page on this site (e.g. /order), https:// for another site, or mailto: for an email address'
        }),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first. Leave gaps (10, 20, 30…).',
    }),
  ],
  orderings: [
    {name: 'gridOrder', title: 'Grid order', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', jp: 'jp', sortOrder: 'sortOrder', media: 'image'},
    prepare: ({title, jp, sortOrder, media}) => ({
      title: `${title}${jp ? ` · ${jp}` : ''}`,
      subtitle: sortOrder == null ? 'No sort order' : `Position ${sortOrder}`,
      media,
    }),
  },
})
