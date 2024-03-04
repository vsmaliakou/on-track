import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/const'

export function isPageValid(page) {
  return Object.keys(NAV_ITEMS).includes(page)
}

export function isTimelineItemValid({ hour }) {
  return typeof hour === 'number' && hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY
}

export function validateTimelineItems(timelineItems) {
  return timelineItems.every(isTimelineItemValid)
}

export function validateSelectOptions(options) {
  return options.every(isSelectOptionValid)
}

export function isSelectOptionValid({ value, label }) {
  return typeof value === 'number' && typeof label === 'string'
}
