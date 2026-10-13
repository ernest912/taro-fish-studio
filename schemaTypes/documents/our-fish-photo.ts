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
 *
 * There is deliberately no caption or alt field. These are atmospheric shots
 * sitting beside copy that already says what the section is about, so the
 * site marks them decorative and screen readers skip them — better than
 * reading out whatever got typed to clear a required field.
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
    // The uploaded file's own name is the only words these documents carry
    // now, so it stands in as the title in the Studio list.
    select: {filename: 'image.asset.originalFilename', sortOrder: 'sortOrder', media: 'image'},
    prepare: ({filename, sortOrder, media}) => ({
      title: filename || 'Photo',
      subtitle: sortOrder == null ? 'No sort order' : `Position ${sortOrder}`,
      media,
    }),
  },
})
