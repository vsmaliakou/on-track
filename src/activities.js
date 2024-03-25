import { SECONDS_IN_HOUR, HUNDRED_PERCENT } from '@/const'
import { id } from '@/functions'
import { computed, ref } from 'vue'
import { getTotalActivitySeconds } from '@/timeline-items'

export const activities = ref(generateActivities())
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))
export const trackedActivities = computed(() => {
  return activities.value.filter(({ secondsToComplete }) => secondsToComplete)
})

export function createActivity(activity) {
  activities.value.push(activity)
}

export function deleteActivity(activity) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function generateActivities() {
  return ['Coding', 'Training', 'Reading'].map((name, index) => ({
    id: id(),
    name,
    // secondsToComplete: index * SECONDS_IN_HOUR
    secondsToComplete: 15 * 60
  }))
}

function generateActivitySelectOptions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}

export function getActivityProgress(activity) {
  return Math.floor(
    (getTotalActivitySeconds(activity) * HUNDRED_PERCENT) / activity.secondsToComplete
  )
}
