import '@/assets/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import { loadState, saveState } from '@/storage'
import { findActiveTimelineItem, startTimelineItemTimer } from '@/timeline-items'

loadState()

const activeTimelineItem = findActiveTimelineItem()

if (activeTimelineItem) {
  startTimelineItemTimer(activeTimelineItem)
}

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
