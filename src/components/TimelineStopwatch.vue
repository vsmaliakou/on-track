<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  MILLISECONDS_IN_SECOND
} from '@/const'
import { isHourValid, isNumber } from '@/validators'
import { formatSeconds } from '@/functions'
import { ref } from 'vue'

const props = defineProps({
  seconds: {
    type: Number,
    default: 0,
    validator: isNumber
  },
  hour: {
    type: Number,
    required: true,
    validator: isHourValid
  }
})

const emit = defineEmits({
  updateSeconds: isNumber
})

const seconds = ref(props.seconds)
const isRunning = ref(false)

const isStartButtonDisabled = props.hour !== new Date().getHours()

function start() {
  isRunning.value = setInterval(() => {
    emit('updateSeconds', 1)

    seconds.value++
  }, MILLISECONDS_IN_SECOND)
}

function stop() {
  clearInterval(isRunning.value)

  isRunning.value = false
}

function reset() {
  stop()
  emit('updateSeconds', -seconds.value)

  seconds.value = 0
}
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" @click="reset" :disabled="!seconds">
      <ArrowPathIcon class="h-8" />
    </BaseButton>

    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(seconds) }}
    </div>

    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <PauseIcon class="h-8" />
    </BaseButton>

    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" @click="start" :disabled="isStartButtonDisabled">
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>
