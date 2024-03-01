<script setup>
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline'
import NavItem from '@/components/NavItem.vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/const'

defineProps(['currentPage'])

const emit = defineEmits(['navigate'])

const navItems = {
  [PAGE_TIMELINE]: ClockIcon,
  [PAGE_ACTIVITIES]: ListBulletIcon,
  [PAGE_PROGRESS]: ChartBarIcon
}
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <NavItem
        v-for="(icon, item) in navItems"
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
