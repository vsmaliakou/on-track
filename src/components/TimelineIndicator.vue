<script setup>
import {
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECOND,
  MINUTES_IN_HOUR,
  SECONDS_IN_DAY,
  SECONDS_IN_MINUTE
} from '@/const'
import { computed, ref, watchEffect } from 'vue'

const indicatorRef = ref()
const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())

function getTimelineHeight() {
  return indicatorRef.value?.parentNode.getBoundingClientRect().height
}

function calculateSecondsSinceMidnight() {
  const now = new Date()

  return SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() + SECONDS_IN_MINUTE * now.getMinutes()
}

const secondsSinceMidnightInPercentage = computed(() => {
  return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

const topOffset = computed(() => {
  return (secondsSinceMidnightInPercentage.value * getTimelineHeight()) / HUNDRED_PERCENT
})

setInterval(() => secondsSinceMidnight.value++, MILLISECONDS_IN_SECOND)

watchEffect(() => {
  if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
    secondsSinceMidnight.value = 0
  }
})
</script>

<template>
  <hr
    ref="indicatorRef"
    class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
    :style="{ top: `${topOffset}px` }"
  />
</template>
