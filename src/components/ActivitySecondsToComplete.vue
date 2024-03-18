<script setup>
import { formatSeconds, getTotalActivitySeconds } from '@/functions'
import { isActivityValid } from '@/validators'
import { computed, inject } from 'vue'
import { timelineItemsKey } from '@/keys'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})

const timelineItems = inject(timelineItemsKey)

const secondsDiff = computed(() => {
  return (
    getTotalActivitySeconds(props.activity, timelineItems.value) - props.activity.secondsToComplete
  )
})
const sign = computed(() => (secondsDiff.value >= 0 ? '+' : '-'))
const seconds = computed(() => `${sign.value}${formatSeconds(secondsDiff.value)}`)
const colorClasses = computed(() => {
  return secondsDiff.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
})
const classes = computed(() => {
  return `flex items-center rounded px-2 font-mono text-xl ${colorClasses.value}`
})
</script>

<template>
  <div :class="classes">{{ seconds }}</div>
</template>
