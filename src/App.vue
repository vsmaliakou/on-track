<script setup>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import Timeline from '@/pages/Timeline.vue'
import Activities from '@/pages/Activities.vue'
import Progress from '@/pages/Progress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/const'
import { provide, readonly } from 'vue'
import { generatePeriodSelectOptions } from '@/functions'
import { currentPage, timelineRef } from '@/router'
import * as keys from '@/keys'
import {
  setActivitySecondsToComplete,
  activitySelectOptions,
  createActivity,
  deleteActivity
} from '@/activities'
import {
  updateTimelineItemActivitySeconds,
  setTimelineItemActivity,
  resetTimelineItemActivities
} from '@/timeline-items'

provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions))
provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete)
provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, (activity) => {
  resetTimelineItemActivities(activity)
  deleteActivity(activity)
})
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
