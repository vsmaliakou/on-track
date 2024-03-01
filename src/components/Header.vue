<script setup>
import Logo from '@/components/Logo.vue'
import HeaderProgress from '@/components/HeaderProgress.vue'
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <Logo />

    <HeaderProgress />
  </header>
</template>
