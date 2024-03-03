<script setup>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import Timeline from '@/pages/Timeline.vue'
import Activities from '@/pages/Activities.vue'
import Progress from '@/pages/Progress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/const'
import { ref } from 'vue'
import { normalizePageHash } from '@/functions'

const currentPage = ref(normalizePageHash())

function goTo(page) {
  currentPage.value = page
}
</script>

<template>
  <Header @go-to-timeline="goTo(PAGE_TIMELINE)" @go-to-progress="goTo(PAGE_PROGRESS)" />

  <main class="flex flex-grow flex-col">
    <Timeline v-show="currentPage === PAGE_TIMELINE" />

    <Activities v-show="currentPage === PAGE_ACTIVITIES" />

    <Progress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <Nav :current-page="currentPage" @navigate="goTo($event)" />
</template>
