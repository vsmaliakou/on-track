<script setup>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import Timeline from '@/pages/Timeline.vue'
import Activities from '@/pages/Activities.vue'
import Progress from '@/pages/Progress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/const'
import { computed, provide, ref } from 'vue'
import {
  generateTimelineItems,
  generateActivitySelectOptions,
  generateActivities,
  generatePeriodSelectOptions
} from '@/functions'
import { currentPage, timelineRef } from '@/router'

const activities = ref(generateActivities())
const timelineItems = ref(generateTimelineItems(activities.value))
const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })

  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity) {
  activities.value.push(activity)
}

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

provide('timelineItems', timelineItems.value)
provide('activitySelectOptions', activitySelectOptions.value)
provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
provide('periodSelectOptions', generatePeriodSelectOptions())
provide('setTimelineItemActivity', setTimelineItemActivity)
provide('setActivitySecondsToComplete', setActivitySecondsToComplete)
provide('createActivity', createActivity)
provide('deleteActivity', deleteActivity)
</script>

<template>
  <Header />

  <main class="flex flex-grow flex-col">
    <Timeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      ref="timelineRef"
    />

    <Activities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />

    <Progress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <Nav />
</template>
