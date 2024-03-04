<script setup>
import Logo from '@/components/Logo.vue'
import HeaderProgress from '@/components/HeaderProgress.vue'
import { isPageValid } from '@/validators'
import { PAGE_PROGRESS, PAGE_TIMELINE } from '@/const'

const emit = defineEmits({
  navigate: isPageValid
})
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <Logo @click="emit('navigate', PAGE_TIMELINE)" />

    <HeaderProgress @click="emit('navigate', PAGE_PROGRESS)" />
  </header>
</template>
