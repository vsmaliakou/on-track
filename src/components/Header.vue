<script setup>
import Logo from '@/components/Logo.vue'
import HeaderProgress from '@/components/HeaderProgress.vue'

const emit = defineEmits(['goToTimeline', 'goToProgress'])
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <Logo @click="emit('goToTimeline')" />

    <HeaderProgress @click="emit('goToProgress')" />
  </header>
</template>
