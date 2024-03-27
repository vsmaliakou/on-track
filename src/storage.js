import { APP_NAME, MILLISECONDS_IN_SECOND } from '@/const'
import { today, isToday } from '@/time'
import { timelineItems } from '@/timeline-items'
import { activities } from '@/activities'

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

function syncIdleSeconds(timelineItems, lastActiveAt) {
  const activeTimelineItem = timelineItems.find(({ isActive }) => isActive)

  if (activeTimelineItem) {
    activeTimelineItem.activitySeconds += (today() - lastActiveAt) / MILLISECONDS_IN_SECOND
  }

  return timelineItems
}

export function loadState() {
  const serializedState = localStorage.getItem(APP_NAME)
  const state = serializedState ? JSON.parse(serializedState) : {}
  const lastActiveAt = new Date(state.lastActiveAt)

  activities.value = state.activities || activities.value
  timelineItems.value = isToday(lastActiveAt)
    ? syncIdleSeconds(state.timelineItems, lastActiveAt)
    : timelineItems.value
}
