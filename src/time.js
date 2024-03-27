import { HUNDRED_PERCENT, MILLISECONDS_IN_SECOND, SECONDS_IN_DAY, SECONDS_IN_HOUR } from '@/const'
import { computed, ref } from 'vue'

let currentDateTimer = null

export const now = ref(today())

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))
const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)
export const secondsSinceMidnightInPercentage = computed(() => {
  return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

export function startCurrentDateTimer() {
  now.value = today()
  currentDateTimer = setInterval(() => {
    now.value = new Date(now.value.getTime() + MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND)
}

export function stopCurrentDateTimer() {
  clearInterval(currentDateTimer)
}

export function today() {
  const today = new Date()

  return today
}

export function tomorrow() {
  const tomorrow = today()

  tomorrow.setDate(tomorrow.getDate() + 1)

  return tomorrow
}

export function isToday(date) {
  return date.toDateString() === today().toDateString()
}

export function endOfHour(date) {
  const endOfHour = new Date(date)

  endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND)
  endOfHour.setMinutes(0, 0, 0)

  return endOfHour
}

export function toSeconds(milliseconds) {
  return Math.round(milliseconds / MILLISECONDS_IN_SECOND)
}
