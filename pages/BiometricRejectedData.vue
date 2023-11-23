<script setup lang="ts">
definePageMeta({
  layout: 'default',
}),

useHead({
  title: 'Biometrics Rejected Data',
  meta: [
    { name: 'description', content: '' }
  ],
  
})
</script>

<template>
  <div class="mt-10 md:flex gap-2 ">
    <HrmsAttendanceRejectedData/>
    
  </div>

</template>