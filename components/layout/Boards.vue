<template>
  <div class="w-full md:max-w-screen-lg max-w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700 h-96 overflow-auto">

    <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b">{{data.title}}</h5>
    <slot>

    </slot>
    
  </div>
</template>

<script setup lang="ts">
  const data = defineProps(['title']);
</script>