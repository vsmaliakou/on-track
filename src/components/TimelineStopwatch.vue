<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '@/const'
import { isNumber } from '@/validators'
import { formatSeconds } from '@/functions'

defineProps({
  seconds: {
    type: Number,
    default: 0,
    validator: isNumber
  }
})
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER">
      <ArrowPathIcon class="h-8" />
    </BaseButton>

    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(seconds) }}
    </div>

    <BaseButton :type="BUTTON_TYPE_WARNING">
      <PauseIcon class="h-8" />
    </BaseButton>

    <BaseButton :type="BUTTON_TYPE_SUCCESS">
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>
