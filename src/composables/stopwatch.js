import { MILLISECONDS_IN_SECOND } from '@/const'
import { ref } from 'vue'

export function useStopwatch(initialSeconds, handleSecondsChange) {
  const seconds = ref(initialSeconds)
  const isRunning = ref(false)
  const temp = 120

  function start() {
    isRunning.value = setInterval(() => {
      seconds.value += temp

      handleSecondsChange()
    }, MILLISECONDS_IN_SECOND)
  }

  function stop() {
    clearInterval(isRunning.value)

    isRunning.value = false
  }

  function reset() {
    stop()

    seconds.value = 0

    handleSecondsChange()
  }

  return { seconds, isRunning, start, stop, reset }
}
