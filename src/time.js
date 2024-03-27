import { HUNDRED_PERCENT, MILLISECONDS_IN_SECOND, SECONDS_IN_DAY, SECONDS_IN_MINUTE } from '@/const'
import { computed, ref } from 'vue'

let timer = null
const date = new Date()

date.setHours(0, 0)

export const now = ref(date)

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))
const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)
export const secondsSinceMidnightInPercentage = computed(() => {
  return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

export function startTimer() {
  now.value = date
  timer = setInterval(() => {
    now.value = new Date(now.value.getTime() + SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimer() {
  clearInterval(timer)
}
