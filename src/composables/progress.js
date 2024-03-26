import { calculateActivityCompletionPercentage } from '@/activities'
import { calculateTrackedActivitySeconds, timelineItems } from '@/timeline-items'
import { getProgressColorClass } from '@/functions'
import { computed } from 'vue'

export function useProgress(activity) {
  const trackedActivitySeconds = computed(() => {
    return calculateTrackedActivitySeconds(timelineItems.value, activity)
  })

  const percentage = computed(() => {
    return calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value)
  })

  const colorClass = computed(() => {
    return getProgressColorClass(percentage.value)
  })

  return { trackedActivitySeconds, percentage, colorClass }
}
