<script setup>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import Timeline from '@/pages/Timeline.vue'
import Activities from '@/pages/Activities.vue'
import Progress from '@/pages/Progress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/const'
import { currentPage, timelineRef } from '@/router'
</script>

<template>
  <Header />

  <main class="flex flex-grow flex-col">
    <Timeline v-show="currentPage === PAGE_TIMELINE" ref="timelineRef" />

    <Activities v-show="currentPage === PAGE_ACTIVITIES" />

    <Progress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <Nav />
</template>
