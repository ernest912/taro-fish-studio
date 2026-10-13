import {defineField, defineType} from 'sanity'

/**
 * One photo in the homepage "Our fish" carousel.
 *
 * A document per photo rather than one "section" document holding an array,
 * to match every other type here: the shop adds and removes photos the same
 * way it adds a fish or a news card, and nothing needs a Studio Structure
 * singleton to stop a second copy being created.
 *
 * The carousel shows them in `sortOrder`, cycling every five seconds. Fewer
 * than two and the site renders a plain still image instead — a carousel of
 * one is just a photo that fades to itself.
 */
export const ourFishPhoto = defineType({
  name: 'ourFishPhoto',
  title: 'Homepage - Our Fish Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description:
        'Shown in a wide 16:10 frame. Landscape photos work best; drag the crop handle to set what stays in view. The homepage cycles through these every five seconds — add at least two, or a single photo simply sits there as a still image.',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Photo description',
      type: 'string',
      description:
        'What the photo shows, for people using a screen reader. e.g. A tray of sliced otoro on ice.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first. Leave gaps (10, 20, 30…).',
    }),
  ],
  orderings: [
    {name: 'carouselOrder', title: 'Carousel order', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'alt', sortOrder: 'sortOrder', media: 'image'},
    prepare: ({title, sortOrder, media}) => ({
      title: title || 'Untitled photo',
      subtitle: sortOrder == null ? 'No sort order' : `Position ${sortOrder}`,
      media,
    }),
  },
})
