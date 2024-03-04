<script setup>
import BaseSelect from '@/components/BaseSelect.vue'
import { isTimelineItemValid } from '@/validators'
import { ref } from 'vue'

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid
  }
})

const hourLinkClasses = [
  'absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg',
  props.timelineItem.hour === new Date().getHours()
    ? 'bg-purple-900 font-black text-white'
    : 'bg-gray-100 text-gray-500'
]

const options = [
  { value: 1, label: 'Coding' },
  { value: 2, label: 'Reading' },
  { value: 3, label: 'Training' }
]

const selectActivityId = ref(1)
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <a href="#" :class="hourLinkClasses">{{ timelineItem.hour }}:00</a>

    <BaseSelect
      :options="options"
      placeholder="Rest"
      :selected="selectActivityId"
      @select="selectActivityId = $event"
    />
  </li>
</template>
