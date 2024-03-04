<script setup>
import ActivityItem from '@/components/ActivityItem.vue'
import ActivityForm from '@/components/ActivityForm.vue'
import { isActivityValid, validateActivities } from '@/validators'

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: validateActivities
  }
})

const emit = defineEmits({
  deleteActivity: isActivityValid,
  createActivity: isActivityValid
})
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>

    <ActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
