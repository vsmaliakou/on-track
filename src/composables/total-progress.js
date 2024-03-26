import { calculateCompletionPercentage, trackedActivities } from '@/activities'
import { getProgressColorClass } from '@/functions'
import { calculateTrackedActivitySeconds, timelineItems } from '@/timeline-items'
import { computed } from 'vue'

export function useTotalProgress() {
  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) => {
        return Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete
        )
      })
      .reduce((total, seconds) => total + seconds, 0)
  })

  const percentage = computed(() => {
    return calculateCompletionPercentage(totalTrackedSeconds.value)
  })

  const colorClass = computed(() => {
    return getProgressColorClass(percentage.value)
  })

  return { percentage, colorClass }
}
