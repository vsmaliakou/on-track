<script setup>
import { HUNDRED_PERCENT } from '@/const'
import { useSecondsSinceMidnight } from '@/composables/seconds-since-midnight'
import { computed, ref } from 'vue'

const indicatorRef = ref()
const { secondsSinceMidnightInPercentage } = useSecondsSinceMidnight()

function getTimelineHeight() {
  return indicatorRef.value?.parentNode.getBoundingClientRect().height
}

const topOffset = computed(() => {
  return (secondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENT
})
</script>

<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
    :style="{ top: `${topOffset}px` }"
  />
</template>
