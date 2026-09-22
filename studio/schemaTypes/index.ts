import {linkType} from './shared'
import {course, courseGroup, priceItem, scheduleEntry} from './kurse'
import {event, galleryImage, siteSettings, testimonial} from './site'
import {aboutPage, contactPage, customPage, eventsPage, galeriePage, hairPage, homePage, kursePage} from './pages'
import {blockTypes} from './blocks'
import {pageBuilder} from './pageBuilder'

export const schemaTypes = [
  linkType,
  pageBuilder,
  ...blockTypes,
  siteSettings,
  homePage,
  aboutPage,
  eventsPage,
  hairPage,
  contactPage,
  kursePage,
  galeriePage,
  customPage,
  courseGroup,
  course,
  priceItem,
  scheduleEntry,
  event,
  galleryImage,
  testimonial,
]

export const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'eventsPage',
  'hairPage',
  'contactPage',
  'kursePage',
  'galeriePage',
])
