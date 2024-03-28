<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import TimelineIndicator from '@/components/TimelineIndicator.vue'
import { timelineItems, timelineItemRefs, scrollToCurrentHour } from '@/timeline-items'
import { onActivated } from 'vue'

onActivated(scrollToCurrentHour)
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
