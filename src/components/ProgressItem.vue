<script setup>
import { getActivityProgress } from '@/activities'
import { getProgressColorClass, formatSeconds } from '@/functions'
import { getTotalActivitySeconds } from '@/timeline-items'
import { isActivityValid } from '@/validators'
import { computed } from 'vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})

const progress = computed(() => getActivityProgress(props.activity))
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>

    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div :class="getProgressColorClass(progress)" :style="`width: ${progress}%`"></div>
    </div>

    <div class="flex justify-between font-mono text-sm">
      <span>{{ progress }}%</span>

      <span
        >{{ formatSeconds(getTotalActivitySeconds(activity)) }} /
        {{ formatSeconds(activity.secondsToComplete) }}</span
      >
    </div>
  </li>
</template>
