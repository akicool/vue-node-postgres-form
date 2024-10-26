<script setup>
import { ref } from 'vue'
import FormComponent from '@/components/FormComponent.vue'

</script>

<template>
  <main
    class="w-full h-screen flex justify-center items-center p-5 bg-slate-700"
  >
    <div class="flex flex-col gap-4 w-full items-center text-white">
      <FormComponent />
    </div>
  </main>
</template>
