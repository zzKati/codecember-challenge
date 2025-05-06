<script setup lang="ts">
import TheFooter from './components/TheFooter.tsx'
</script>

<template>
  <div class=" w-screen h-screen text-gray" flex="~ col">
    <div class=" flex flex-1 justify-center items-center " >
      <RouterView />  
    </div>
    <TheFooter />
  </div>
</template>

<style scoped>

</style>

