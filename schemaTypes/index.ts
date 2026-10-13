import type {SchemaTypeDefinition} from 'sanity'
import {fish} from './documents/fish'
import {instagramPost} from './documents/instagram-post'
import {job} from './documents/job'
import {newsItem} from './documents/news-item'
import {ourFishPhoto} from './documents/our-fish-photo'
import {product} from './documents/product'
import {productCategory} from './documents/product-category'

/**
 * Every document type the Studio knows about.
 *
 * Each `title` is prefixed with the page it feeds ("Homepage - …", "Menu - …")
 * because the Studio lists types alphabetically by title: the prefix is what
 * groups everything for one page together instead of scattering it down the
 * list. The `name` beside it is the stored type and must not change — that is
 * what every existing document is filed under.
 *
 * Not yet here: the About story and the store details. Those move once this
 * first set is proven — the story needs rich text, the stores need opening
 * hours modelled per weekday.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  newsItem,
  ourFishPhoto,
  instagramPost,
  fish,
  productCategory,
  product,
  job,
]
