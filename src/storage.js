import { APP_NAME } from '@/const'

export function load() {}

export function save(data) {
  localStorage.setItem(APP_NAME, JSON.stringify({ ...data, date: new Date().toDateString() }))
}
