import {createImageUrlBuilder} from '@sanity/image-url'
import {sanityClient} from 'sanity:client'

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

export function img(image: any, width = 1400, quality = 80) {
  if (!image?.asset) return undefined
  return urlFor(image).width(width).quality(quality).auto('format').url()
}

export function imgSrcSet(image: any, widths = [600, 900, 1400]) {
  if (!image?.asset) return undefined
  return widths.map((w) => `${urlFor(image).width(w).quality(78).auto('format').url()} ${w}w`).join(', ')
}

export function href(target?: string) {
  if (!target) return '#'
  if (/^(https?:|mailto:|tel:)/.test(target)) return target
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const clean = target.replace(/^\//, '')
  const withSlash = /\.(html|pdf|jpg|jpeg|png|webp|svg)$/.test(clean)
    ? clean
    : clean.replace(/\/?$/, '/')
  return `${base}/${withSlash}`
}
