<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { BUTTON_TYPE_PRIMARY } from '@/const'
import { nextTick, ref } from 'vue'
import { id } from '@/functions'
import { createActivity } from '@/activities'
import { ICON_PLUS } from '@/icons'

const name = ref('')

async function submit() {
  createActivity({
    id: id(),
    name: name.value,
    secondsToComplete: 0
  })

  name.value = ''

  await nextTick()

  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      type="text"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
      v-model="name"
    />

    <BaseButton :type="BUTTON_TYPE_PRIMARY" :disabled="name.trim() === ''">
      <BaseIcon :name="ICON_PLUS" class="h-8" />
    </BaseButton>
  </form>
</template>
