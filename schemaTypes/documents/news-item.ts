import {defineField, defineType} from 'sanity'

/**
 * A card in the homepage "News & media" carousel.
 *
 * One document type with three shapes rather than three types, because the
 * carousel orders them together by date. `kind` picks the shape and the
 * irrelevant fields hide themselves.
 */
export const newsItem = defineType({
  name: 'newsItem',
  title: 'Homepage - News & Media',
  type: 'document',
  fields: [
    defineField({
      name: 'kind',
      title: 'Type of card',
      type: 'string',
      options: {
        list: [
          {title: 'Video (YouTube)', value: 'video'},
          {title: 'Press mention', value: 'press'},
          {title: 'Post / announcement', value: 'post'},
        ],
        layout: 'radio',
      },
      initialValue: 'post',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Shown in bold on the card.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Generated from the title. Used internally — click Generate.',
      options: {source: 'title', maxLength: 60},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      description: 'Cards are ordered newest first.',
      validation: (r) => r.required(),
    }),

    // --- video ---
    defineField({
      name: 'youtubeId',
      title: 'YouTube video',
      type: 'string',
      description:
        'Paste the whole link from YouTube’s Share button — the site pulls the video id out of it. A bare id works too. The thumbnail comes from YouTube automatically.',
      hidden: ({parent}) => parent?.kind !== 'video',
      validation: (r) =>
        r.custom((value, ctx) => {
          if ((ctx.parent as {kind?: string})?.kind !== 'video') return true
          if (!value || typeof value !== 'string') return 'A video card needs a YouTube link or id'
          // Same shapes the site accepts; see toYoutubeId() in src/lib/news.ts.
          const ID = '[A-Za-z0-9_-]{11}'
          const inUrl = new RegExp(`(?:youtu[.]be/|/embed/|/shorts/|[?&]v=)(${ID})`)
          const bare = new RegExp(`^(${ID})(?:[?&].*)?$`)
          const text = value.trim()
          return inUrl.test(text) || bare.test(text)
            ? true
            : 'That does not look like a YouTube link or video id'
        }),
    }),

    // --- press ---
    defineField({
      name: 'quote',
      type: 'text',
      rows: 3,
      description: 'The line being quoted. No quotation marks — the design adds them.',
      hidden: ({parent}) => parent?.kind !== 'press',
    }),
    defineField({
      name: 'source',
      type: 'string',
      description: 'Who said it, e.g. Toronto Life.',
      hidden: ({parent}) => parent?.kind !== 'press',
    }),

    // --- post ---
    defineField({
      name: 'image',
      type: 'image',
      description: 'Optional. Without one the card shows a plain tile.',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.kind !== 'post',
    }),

    // --- shared ---
    defineField({
      name: 'blurb',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'One or two lines under the title.',
      hidden: ({parent}) => parent?.kind === 'press',
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'url',
      description: 'Optional. Makes the whole card clickable.',
      hidden: ({parent}) => parent?.kind === 'video',
    }),
  ],
  orderings: [{name: 'dateDesc', title: 'Newest first', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', date: 'date', kind: 'kind', media: 'image'},
    prepare: ({title, date, kind, media}) => ({
      title,
      subtitle: [kind, date].filter(Boolean).join(' · '),
      media,
    }),
  },
})
