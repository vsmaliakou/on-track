import { HUNDRED_PERCENT } from '@/const'
import { computed, ref } from 'vue'

export const activities = ref([])
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))
export const trackedActivities = computed(() => {
  return activities.value.filter(({ secondsToComplete }) => secondsToComplete)
})
export const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})

export function createActivity(activity) {
  activities.value.push(activity)
}

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function generateActivitySelectOptions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}

export function calculateActivityCompletionPercentage({ secondsToComplete }, trackedSeconds) {
  return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete)
}

export function calculateCompletionPercentage(totalTrackedSeconds) {
  return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value)
}
