<script setup>
import { currentPage, navigate } from '@/router'
import { isNavItemValid } from '@/validators'
import { computed } from 'vue'

const props = defineProps({
  navItem: {
    type: Object,
    required: true,
    validator: isNavItemValid
  }
})

const classes = computed(() => {
  return [
    'flex flex-col items-center p-2 text-xs capitalize',
    { 'bg-gray-200 pointer-events-none': currentPage.value === props.navItem.page }
  ]
})
</script>

<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" @click="navigate(navItem.page)" :class="classes">
      <component :is="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>
