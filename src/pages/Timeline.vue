<script setup>
import TimelineItem from '@/components/TimelineItem.vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/const'
import { validateTimelineItems } from '@/validators'
import { nextTick, ref, watchPostEffect } from 'vue'
import { currentPage } from '@/router'

defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems
  }
})

defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= new Date().getHours()

  const options = { behavior: isSmooth ? 'smooth' : 'instant' }

  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options)
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView(options)
  }
}

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick()

    scrollToHour(null, false)
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
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>
