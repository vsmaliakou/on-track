import {
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECOND,
  MINUTES_IN_HOUR,
  SECONDS_IN_DAY,
  SECONDS_IN_MINUTE
} from '@/const'
import { computed, onActivated, onDeactivated, ref, watchEffect } from 'vue'

function calculateSecondsSinceMidnight() {
  const now = new Date()

  return SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() + SECONDS_IN_MINUTE * now.getMinutes()
}

export function useSecondsSinceMidnight() {
  const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())
  let timer = null

  const secondsSinceMidnightInPercentage = computed(() => {
    return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
  })

  watchEffect(() => {
    if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
      secondsSinceMidnight.value = 0
    }
  })

  onActivated(() => {
    secondsSinceMidnight.value = calculateSecondsSinceMidnight()
    timer = setInterval(() => secondsSinceMidnight.value++, MILLISECONDS_IN_SECOND)
  })

  onDeactivated(() => {
    clearInterval(timer)
  })

  return { secondsSinceMidnightInPercentage }
}
