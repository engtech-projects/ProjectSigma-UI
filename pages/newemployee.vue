<template>
  <div class="background mb-8">
    Personnel Information Sheet
  </div>

  <div class="text-left ">
    <div class="inline-block rounded-md p-2">
      <!-- <Avatar /> -->

      <!-- <Fileinput class="mb-8"/> -->

      <Inputfields class=""/>

    </div>
  </div>

</template>

<script setup lang="ts">
definePageMeta({
  layout: 'shell',
}),

useHead({
  title: 'Employee',
  meta: [
    { name: 'description', content: 'New Employee' }
  ],
  
})
</script>