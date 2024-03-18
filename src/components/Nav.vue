<script setup>
import NavItem from '@/components/NavItem.vue'
import { NAV_ITEMS } from '@/const'
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <NavItem v-for="item in NAV_ITEMS" :key="item.page" :nav-item="item" />
    </ul>
  </nav>
</template>
