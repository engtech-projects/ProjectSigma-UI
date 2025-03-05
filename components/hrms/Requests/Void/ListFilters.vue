<script setup>
const model = defineModel({ required: true, type: Object })
</script>
<template>
    <div class="flex gap-2">
        <LayoutFormPsDateInput v-model="model.params.payroll_date" class="w-full" title="Payroll Date" required />
        <LayoutFormPsSelect
            v-model="model.params.payroll_type"
            :options-list="[]"
            :add-all="true"
            title="Payroll Type"
            class="w-full p-2"
            required
        />
        <LayoutFormPsSelect
            v-model="model.params.release_type"
            :options-list="[]"
            :add-all="true"
            title="Release Type"
            class="w-full p-2"
            required
        />
    </div>
</template>
