<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import ActivitySecondsToComplete from '@/components/ActivitySecondsToComplete.vue'
import { BUTTON_TYPE_DANGER } from '@/const'
import { isActivityValid, isUndefined } from '@/validators'
import { inject } from 'vue'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})

const periodSelectOptions = inject('periodSelectOptions')
const setActivitySecondsToComplete = inject('setActivitySecondsToComplete')

const emit = defineEmits({
  delete: isUndefined
})
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8" />
      </BaseButton>

      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>

    <div class="flex gap-2">
      <BaseSelect
        class="font-mono grow"
        placeholder="h:mm"
        :selected="activity.secondsToComplete || null"
        :options="periodSelectOptions"
        @select="setActivitySecondsToComplete(activity, $event || 0)"
      />

      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
