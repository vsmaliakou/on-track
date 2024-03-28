import { computed, ref } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/const'
import { endOfHour, isToday, toSeconds, today } from '@/time'

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
      activitySeconds: timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0
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
  scrollToHour(today().getHours(), isSmooth)
}

export function filterTimelineItemsByActivity(timelineItems, { id }) {
  return timelineItems.filter(({ activityId }) => activityId === id)
}

export function resetTimelineItems() {
  timelineItems.value.forEach((timelineItem) => {
    updateTimelineItem(timelineItem, { activitySeconds: 0, isActive: false })
  })
}

function calculateIdleSeconds(lastActiveAt) {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today() - lastActiveAt)
    : toSeconds(endOfHour(lastActiveAt) - lastActiveAt)
}

function syncIdleSeconds(lastActiveAt) {
  updateTimelineItem(activeTimelineItem.value, {
    activitySeconds: activeTimelineItem.value.activitySeconds + calculateIdleSeconds(lastActiveAt)
  })
}

export function initializeTimelineItems(state) {
  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? generateTimelineItems()

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    syncIdleSeconds(lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    resetTimelineItems()
  }
}
