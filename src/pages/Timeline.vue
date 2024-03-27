<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import TimelineIndicator from '@/components/TimelineIndicator.vue'
import { timelineItems, timelineItemRefs, scrollToCurrentHour } from '@/timeline-items'
import { startTimer, stopTimer } from '@/time'
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  scrollToCurrentHour()
  startTimer()
})

onDeactivated(stopTimer)
</script>

<template>
  <div class="mt-7 relative">
    <TimelineIndicator />

    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        ref="timelineItemRefs"
        :timeline-item="timelineItem"
      />
    </ul>
  </div>
</template>
