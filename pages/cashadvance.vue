<template>
    <div>
        <HrmsCashadvanceForm />
        <HrmsCashadvanceTable />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'default',
}),

useHead({
  title: 'Cash Advance',
  meta: [
    { name: 'description', content: '' }
  ],
  
})
</script>