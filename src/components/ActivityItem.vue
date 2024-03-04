<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { ref } from 'vue'

defineProps({
  activity: {
    type: String,
    required: true
  }
})

const periodSelectOptions = [
  { value: 15, label: '0:15' },
  { value: 30, label: '0:30' },
  { value: 45, label: '0:45' }
]

const secondsToComplete = ref(null)
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton>
        <TrashIcon class="h-8" />
      </BaseButton>

      <span class="truncate text-xl">{{ activity }}</span>
    </div>

    <div>
      <BaseSelect
        class="font-mono"
        placeholder="h:mm"
        :selected="secondsToComplete"
        :options="periodSelectOptions"
        @select="secondsToComplete = $event"
      />
    </div>
  </li>
</template>
