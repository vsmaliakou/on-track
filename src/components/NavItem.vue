<script setup>
import { currentPage, navigate } from '@/router'
import { isPageValid } from '@/validators'
import { computed } from 'vue'

const props = defineProps({
  page: {
    type: String,
    required: true,
    validator: isPageValid
  }
})

const classes = computed(() => {
  return [
    'flex flex-col items-center p-2 text-xs capitalize',
    { 'bg-gray-200 pointer-events-none': currentPage.value === props.page }
  ]
})
</script>

<template>
  <li class="flex-1">
    <a :href="`#${page}`" @click="navigate(page)" :class="classes">
      <slot />
    </a>
  </li>
</template>
