<script setup>
import ActivityItem from '@/components/ActivityItem.vue'
import ActivityForm from '@/components/ActivityForm.vue'
import ActivitiesEmptyState from '@/components/ActivitiesEmptyState.vue'
import { isActivityValid, validateActivities, isNumber, validateTimelineItems } from '@/validators'

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: validateActivities
  },
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems
  }
})

const emit = defineEmits({
  deleteActivity: isActivityValid,
  createActivity: isActivityValid,
  setActivitySecondsToComplete(activity, secondsToComplete) {
    return [isActivityValid(activity), isNumber(secondsToComplete)].every(Boolean)
  }
})

function setSecondsToComplete(activity, secondsToComplete) {
  emit('setActivitySecondsToComplete', activity, secondsToComplete)
}
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length" class="divide-y grow">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        :timeline-items="timelineItems"
        @delete="emit('deleteActivity', activity)"
        @set-seconds-to-complete="setSecondsToComplete(activity, $event)"
      />
    </ul>

    <ActivitiesEmptyState v-else />

    <ActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
