<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  NULLABLE_ACTIVITY
} from '@/const'
import {
  isActivityValid,
  isTimelineItemValid,
  validateActivities,
  validateSelectOptions
} from '@/validators'
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  },
  activities: {
    type: Array,
    required: true,
    validator: validateActivities
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions
  }
})

const emit = defineEmits({
  selectActivity: isActivityValid
})

function selectActivity(id) {
  emit('selectActivity', findActivityById(id))
}

function findActivityById(id) {
  return props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />

    <BaseSelect
      placeholder="Rest"
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      @select="selectActivity"
    />

    <div class="flex w-full gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER">
        <ArrowPathIcon class="h-8" />
      </BaseButton>

      <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
        00:00:00
      </div>

      <BaseButton :type="BUTTON_TYPE_WARNING">
        <PauseIcon class="h-8" />
      </BaseButton>

      <BaseButton :type="BUTTON_TYPE_SUCCESS">
        <PlayIcon class="h-8" />
      </BaseButton>
    </div>
  </li>
</template>
