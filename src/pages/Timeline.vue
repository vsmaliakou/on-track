<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import { PAGE_TIMELINE } from '@/const'
import { nextTick, watchPostEffect } from 'vue'
import { currentPage } from '@/router'
import {
  timelineItems,
  timelineItemRefs,
  scrollToHour,
  scrollToCurrentHour
} from '@/timeline-items'

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick()

    scrollToCurrentHour(false)
  }
})
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        ref="timelineItemRefs"
        :timeline-item="timelineItem"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>
