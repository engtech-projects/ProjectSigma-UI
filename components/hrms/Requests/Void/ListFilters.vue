<script setup>
const model = defineModel({ required: true, type: Object })
</script>
<template>
    <div class="flex gap-2">
        <LayoutFormPsDateInput v-model="model.params.request_date" class="w-full" title="Request Date" hidden required />
    </div>
</template>
