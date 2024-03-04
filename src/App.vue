<script setup>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import Timeline from '@/pages/Timeline.vue'
import Activities from '@/pages/Activities.vue'
import Progress from '@/pages/Progress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/const'
import { ref } from 'vue'
import { normalizePageHash, generateTimelineItems } from '@/functions'

const currentPage = ref(normalizePageHash())
const timelineItems = generateTimelineItems()

function goTo(page) {
  currentPage.value = page
}
</script>

<template>
  <Header @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <Timeline v-show="currentPage === PAGE_TIMELINE" :timeline-items="timelineItems" />

    <Activities v-show="currentPage === PAGE_ACTIVITIES" />

    <Progress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <Nav :current-page="currentPage" @navigate="goTo($event)" />
</template>
