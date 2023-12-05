<script setup lang="ts">
definePageMeta({
  layout: 'default',
}),

useHead({
  title: 'User Accounts',
  meta: [
    { name: 'description', content: '' }
  ],

})


</script>

<template>
  <div class="mt-10 md:mt-0">
    <HrmsAttendanceUserAccounts />
  </div>
</template>
