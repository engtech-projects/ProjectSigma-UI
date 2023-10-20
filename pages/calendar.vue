<template>
    <div>
      <Calendar />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'shell',
}),

useHead({
  title: 'Calendar',
  meta: [
    { name: 'description', content: '' }
  ],
  
})
</script>