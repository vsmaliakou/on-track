<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from '@/const'
import { isActivityValid, isNumber, isUndefined } from '@/validators'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid
  }
})

const emit = defineEmits({
  delete: isUndefined,
  setSecondsToComplete: isNumber
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

    <div>
      <BaseSelect
        class="font-mono"
        placeholder="h:mm"
        :selected="activity.secondsToComplete || null"
        :options="PERIOD_SELECT_OPTIONS"
        @select="emit('setSecondsToComplete', $even || 0)"
      />
    </div>
  </li>
</template>
