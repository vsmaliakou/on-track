import '@/assets/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import { loadState, saveState } from '@/storage'
import { activeTimelineItem, startTimelineItemTimer } from '@/timeline-items'

loadState()

if (activeTimelineItem.value) {
  startTimelineItemTimer(activeTimelineItem.value)
}

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
