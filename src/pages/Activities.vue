<script setup>
import ActivityItem from '@/components/ActivityItem.vue'
import ActivityForm from '@/components/ActivityForm.vue'
import ActivitiesEmptyState from '@/components/ActivitiesEmptyState.vue'
import { validateActivities } from '@/validators'

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: validateActivities
  }
})
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length" class="divide-y grow">
      <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity" />
    </ul>

    <ActivitiesEmptyState v-else />

    <ActivityForm />
  </div>
</template>
