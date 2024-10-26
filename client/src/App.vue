<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
</script>

<template>
  <Transition mode="in-out">
    <RouterView />
  </Transition>
</template>
