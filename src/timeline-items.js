import { computed, ref } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/const'
import { endOfHour, isToday, now, toSeconds, today } from '@/time'

export const timelineItems = ref([])
export const timelineItemRefs = ref([])

export const activeTimelineItem = computed(() =>
  timelineItems.value.find(({ isActive }) => isActive)
)

export function updateTimelineItem(timelineItem, fields) {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(timelineItems, activity) {
  filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem) =>
    updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds: timelineItem.hour === now.value.getHours() ? timelineItem.activitySeconds : 0
    })
  )
}

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => {
    return {
      hour,
      activityId: null,
      activitySeconds: 0,
      isActive: false
    }
  })
}

export function calculateTrackedActivitySeconds(timelineItems, activity) {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(seconds + total), 0)
}

export function scrollToHour(hour, isSmooth = true) {
  const element = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el

  element.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' })
}

export function scrollToCurrentHour(isSmooth = false) {
  scrollToHour(now.value.getHours(), isSmooth)
}

export function filterTimelineItemsByActivity(timelineItems, { id }) {
  return timelineItems.filter(({ activityId }) => activityId === id)
}

export function resetTimelineItems(timelineItems) {
  return timelineItems.map((timelineItem) => {
    return {
      ...timelineItem,
      activitySeconds: 0,
      isActive: false
    }
  })
}

function calculateIdleSeconds(lastActiveAt) {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today() - lastActiveAt)
    : toSeconds(endOfHour(lastActiveAt) - lastActiveAt)
}

function syncIdleSeconds(timelineItems, lastActiveAt) {
  const activeTimelineItem = timelineItems.find(({ isActive }) => isActive)

  if (activeTimelineItem) {
    activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt)
  }

  return timelineItems
}

export function initializeTimelineItems(state) {
  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? generateTimelineItems()

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    timelineItems.value = syncIdleSeconds(state.timelineItems, lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    timelineItems.value = resetTimelineItems(state.timelineItems)
  }
}
