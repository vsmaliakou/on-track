import { ref } from 'vue'
import { activities } from '@/activities'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/const'
import { currentHour } from '@/functions'

export const timelineItems = ref(generateTimelineItems())
export const timelineItemRefs = ref([])

export function updateTimelineItem(timelineItem, fields) {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(activity) {
  timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .forEach((timelineItem) =>
      updateTimelineItem(timelineItem, { activityId: null, activitySeconds: 0 })
    )
}

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => {
    return {
      hour,
      // activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
      // activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR
      // activityId: [0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
      // activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0
      activityId: null,
      activitySeconds: 0
    }
  })
}

export function getTotalActivitySeconds(activity) {
  return timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .reduce(
      (totalSeconds, timelineItem) => Math.round(timelineItem.activitySeconds + totalSeconds),
      0
    )
}

function hasActivity(timelineItem, activity) {
  return timelineItem.activityId === activity.id
}

export function scrollToHour(hour, isSmooth = true) {
  const element = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el

  element.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' })
}

export function scrollToCurrentHour(isSmooth = false) {
  scrollToHour(currentHour(), isSmooth)
}
