import { calculateActivityCompletionPercentage } from '@/activities'
import { calculateTrackedActivitySeconds, timelineItems } from '@/timeline-items'
import { getProgressColorClass } from '@/functions'
import { computed } from 'vue'

export function useProgress(activity) {
  const trackedSeconds = computed(() => {
    return calculateTrackedActivitySeconds(timelineItems.value, activity)
  })

  const percentage = computed(() => {
    return calculateActivityCompletionPercentage(activity, trackedSeconds.value)
  })

  const colorClass = computed(() => {
    return getProgressColorClass(percentage.value)
  })

  return { trackedSeconds, percentage, colorClass }
}
