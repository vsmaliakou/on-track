import { APP_NAME } from '@/const'
import { today } from '@/time'
import { activeTimelineItem, initializeTimelineItems, timelineItems } from '@/timeline-items'
import { activities, initializeActivities } from '@/activities'
import { startTimelineItemTimer, stopTimelineItemTimer } from '@/timeline-item-timer'

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem(APP_NAME) ?? '{}')
}

export function loadState() {
  const state = loadFromLocalStorage()

  initializeActivities(state)
  initializeTimelineItems(state)
}

export function saveState() {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today()
    })
  )
}

export function syncState(shouldLoad = true) {
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    shouldLoad ? startTimelineItemTimer() : stopTimelineItemTimer()
  }
}
