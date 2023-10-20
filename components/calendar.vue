<template>
  <VCalendar class="my-calendar" :attributes='attrs'  />
</template>

<style>
.my-calendar .vc-weekday-1, .my-calendar .vc-weekday-7 {
  color: #6366f1;
}
</style>

<script setup>
import { ref } from 'vue';

const attrs = ref([
  {
    key: 'today',
    highlight: true,
    dates: new Date(),
  },
]);
</script>

