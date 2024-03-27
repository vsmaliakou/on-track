import '@/assets/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import * as storage from '@/storage'
import { timelineItems } from '@/timeline-items'
import { activities } from '@/activities'
import { isToday } from '@/time'

function saveState() {
  storage.save({
    timelineItems: timelineItems.value,
    activities: activities.value
  })
}

function loadState() {
  const state = storage.load()

  timelineItems.value = isToday(new Date(state.date)) ? state.timelineItems : timelineItems.value
  activities.value = state.activities || activities.value
}

loadState()

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
