<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'
import { isHourValid, isTimelineItemValid } from '@/validators'
import { inject } from 'vue'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  }
})

const activitySelectOptions = inject('activitySelectOptions')
const setTimelineItemActivity = inject('setTimelineItemActivity')

const emit = defineEmits({
  scrollToHour: isHourValid
})
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />

    <BaseSelect
      placeholder="Rest"
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      @select="setTimelineItemActivity(timelineItem, $event)"
    />

    <TimelineStopwatch :timelineItem="timelineItem" />
  </li>
</template>
