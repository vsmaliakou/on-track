<script setup>
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

const navItems = {
  timeline: ClockIcon,
  activities: ListBulletIcon,
  progress: ChartBarIcon,
};
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <li v-for="(icon, item) in navItems" :key="item" class="flex-1">
        <a class="flex flex-col items-center p-2 text-xs capitalize" :href="`#${item}`">
          <component :is="icon" class="h-6 w-6" />
          
          {{ item }}
        </a>
      </li>
    </ul>
  </nav>
</template>