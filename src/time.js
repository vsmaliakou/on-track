import { HUNDRED_PERCENT, MILLISECONDS_IN_SECOND, SECONDS_IN_DAY } from '@/const'
import { computed, ref } from 'vue'

export const now = ref(new Date())

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))
const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)
export const secondsSinceMidnightInPercentage = computed(() => {
  return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

let timer = null

export function startTimer() {
  now.value = new Date()
  timer = setInterval(() => {
    now.value = new Date(now.value.getTime() + 5 * 60 * MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimer() {
  clearInterval(timer)
}
