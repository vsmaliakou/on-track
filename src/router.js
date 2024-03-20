import { ref } from 'vue'
import { PAGE_TIMELINE } from '@/const'
import { isPageValid } from '@/validators'

function normalizePageHash() {
  const page = window.location.hash.slice(1)

  if (isPageValid(page)) {
    return page
  }

  window.location.hash = PAGE_TIMELINE

  return PAGE_TIMELINE
}

export const currentPage = ref(normalizePageHash())

export function navigate(page) {
  document.body.scrollIntoView()
  currentPage.value = page
}
