import '@/assets/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import { loadState, saveState } from '@/storage'

loadState()

document.addEventListener('visibilitychange', () => {
  document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
