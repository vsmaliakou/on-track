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

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    saveState()
  }
})

createApp(App).mount('#app')
