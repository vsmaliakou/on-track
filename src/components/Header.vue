<script setup>
import Logo from '@/components/Logo.vue'
import HeaderProgress from '@/components/HeaderProgress.vue'
import { PAGE_PROGRESS, PAGE_TIMELINE } from '@/const'
import { navigate } from '@/router'
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <Logo @click="navigate(PAGE_TIMELINE)" />

    <HeaderProgress @click="navigate(PAGE_PROGRESS)" />
  </header>
</template>
