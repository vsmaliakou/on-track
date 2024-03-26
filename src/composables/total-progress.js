import { calculateCompletionPercentage, trackedActivities } from '@/activities'
import { getProgressColorClass } from '@/functions'
import { calculateTrackedActivitySeconds, timelineItems } from '@/timeline-items'
import { computed } from 'vue'

export function useTotalProgress() {
  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value.reduce((total, activity) => {
      let trackedSeconds = calculateTrackedActivitySeconds(timelineItems.value, activity)

      trackedSeconds =
        trackedSeconds < activity.secondsToComplete ? trackedSeconds : activity.secondsToComplete

      return total + trackedSeconds
    }, 0)
  })

  const percentage = computed(() => {
    return calculateCompletionPercentage(totalTrackedSeconds.value)
  })

  const colorClass = computed(() => {
    return getProgressColorClass(percentage.value)
  })

  return { percentage, colorClass }
}
