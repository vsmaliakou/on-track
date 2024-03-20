<script setup>
import Header from '@/components/Header.vue'
import Nav from '@/components/Nav.vue'
import { currentPage, routes } from '@/router'
</script>

<template>
  <Header />

  <main class="flex flex-grow flex-col">
    <KeepAlive>
      <component :is="routes[currentPage]" />
    </KeepAlive>
  </main>

  <Nav />
</template>
