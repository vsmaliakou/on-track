<script setup>
import NavItem from '@/components/NavItem.vue'
import { NAV_ITEMS } from '@/const'
import { isPageValid } from '@/validators'

defineProps({
  currentPage: {
    type: String,
    required: true,
    validator: isPageValid
  }
})

const emit = defineEmits({
  navigate: isPageValid
})
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <NavItem
        v-for="(icon, item) in NAV_ITEMS"
        :key="item"
        :href="`#${item}`"
        :class="{ 'bg-gray-200 pointer-events-none': currentPage === item }"
        @click="emit('navigate', item)"
      >
        <component :is="icon" class="h-6 w-6" /> {{ item }}
      </NavItem>
    </ul>
  </nav>
</template>
