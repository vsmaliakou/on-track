import { ref } from 'vue'
import { activities } from '@/activities'
import { HOURS_IN_DAY } from '@/const'

export const timelineItems = ref(generateTimelineItems())

export function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

export function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

export function resetTimelineItemActivities(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })
}

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => {
    return {
      hour,
      // activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
      // activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR
      activityId: [0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
      activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0
    }
  })
}
