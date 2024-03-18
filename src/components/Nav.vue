<script setup>
import NavItem from '@/components/NavItem.vue'
import { NAV_ITEMS } from '@/const'
import { currentPage, navigate } from '@/router'
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <NavItem
        v-for="(icon, item) in NAV_ITEMS"
        :key="item"
        :href="`#${item}`"
        :class="{ 'bg-gray-200 pointer-events-none': currentPage === item }"
        @click="navigate(item)"
      >
        <component :is="icon" class="h-6 w-6" /> {{ item }}
      </NavItem>
    </ul>
  </nav>
</template>
