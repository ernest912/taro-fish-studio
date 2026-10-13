import {defineField, defineType} from 'sanity'

/**
 * A tile in the homepage Instagram strip.
 *
 * Hand-picked rather than pulled from Instagram's API: that route needs a
 * Professional account, a linked Facebook Page and a token that expires every
 * 60 days, which tends to break silently months after launch.
 *
 * The link is what the site actually shows — it embeds the real post, so the
 * caption and photo stay in step with Instagram on their own. The image below
 * it is only a fallback for links Instagram cannot embed.
 *
 * There is deliberately no description field. The tile is Instagram's own
 * embed, which carries the post's real caption, so a second description typed
 * here would only ever be a worse copy of it. Where the fallback image is used
 * instead, the site labels it as a post from the shop's account.
 */
export const instagramPost = defineType({
  name: 'instagramPost',
  title: 'Homepage - Instagram Post',
  type: 'document',
  fields: [
    defineField({
      name: 'href',
      title: 'Link to the post',
      type: 'url',
      description:
        'Open the post on Instagram, tap ••• › Copy link, and paste it here. The site embeds the real post from this.',
      validation: (r) =>
        r.required().custom((value) => {
          if (typeof value !== 'string') return true
          return /instagram[.]com\/(p|reel|tv)\/[A-Za-z0-9_-]+/.test(value)
            ? true
            : 'That is not a link to a single post — it should contain /p/, /reel/ or /tv/'
        }),
    }),
    defineField({
      name: 'image',
      title: 'Fallback image',
      type: 'image',
      description:
        'Optional. Only used if the link above cannot be embedded. Leave empty unless a tile shows up blank.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first. Leave gaps (10, 20, 30…).',
    }),
  ],
  orderings: [
    {name: 'stripOrder', title: 'Strip order', by: [{field: 'sortOrder', direction: 'asc'}]},
  ],
  preview: {
    // The post's shortcode is the only thing that distinguishes one of these
    // from another in a list, now that there is no description to show.
    select: {href: 'href', sortOrder: 'sortOrder', media: 'image'},
    prepare: ({href, sortOrder, media}) => {
      const code = typeof href === 'string' ? href.match(/\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/)?.[1] : null
      return {
        title: code ? `Post ${code}` : 'Instagram post',
        subtitle: sortOrder == null ? 'No sort order' : `Position ${sortOrder}`,
        media,
      }
    },
  },
})
