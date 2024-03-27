<script setup>
import BaseIcon from '@/components/BaseIcon.vue'
import { PAGE_TIMELINE } from '@/const'
import { currentPage, navigate } from '@/router'
import { scrollToCurrentHour } from '@/timeline-items'
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
    { 'bg-gray-200': currentPage.value === props.navItem.page }
  ]
})

function handleClick() {
  if (currentPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE) {
    scrollToCurrentHour(true)
  } else {
    navigate(props.navItem.page)
  }
}
</script>

<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" @click="handleClick" :class="classes">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>
