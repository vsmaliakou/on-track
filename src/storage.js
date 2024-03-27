import { APP_NAME } from '@/const'

export function load() {
  const state = localStorage.getItem(APP_NAME)

  return state ? JSON.parse(state) : {}
}

export function save(data) {
  localStorage.setItem(APP_NAME, JSON.stringify({ ...data, date: new Date().toDateString() }))
}
