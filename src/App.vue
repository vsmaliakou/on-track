<script setup>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import Timeline from '@/pages/Timeline.vue'
import Activities from '@/pages/Activities.vue'
import Progress from '@/pages/Progress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/const'
import { ref } from 'vue'

const currentPage = ref(normalizePageHash())

function normalizePageHash() {
  const hash = window.location.hash.slice(1)

  if ([PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE].includes(hash)) {
    return hash
  }

  window.location.hash = PAGE_TIMELINE

  return PAGE_TIMELINE
}
</script>

<template>
  <Header />

  <main class="flex flex-grow flex-col">
    <Timeline v-show="currentPage === PAGE_TIMELINE" />

    <Activities v-show="currentPage === PAGE_ACTIVITIES" />

    <Progress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <Nav :current-page="currentPage" @navigate="currentPage = $event" />
</template>
