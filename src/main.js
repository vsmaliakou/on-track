import '@/assets/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import * as storage from '@/storage'
import { timelineItems } from '@/timeline-items'
import { activities } from '@/activities'

function saveState() {
  storage.save({
    timelineItems: timelineItems.value,
    activities: activities.value
  })
}

function loadState() {
  const state = storage.load()

  timelineItems.value = state.timelineItems
  activities.value = state.activities
}

loadState()

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
