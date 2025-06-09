<script setup>
defineProps({
    data: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <LayoutFormPsDataDisplayBanded
        :data="[
            { label: '13th Month Date', value: data.date_requested_human },
            { label: 'Payroll Duration', value: data.payroll_duration },
            { label: 'Days Advance', value: data.days_advance },
            { label: 'Requested By', value: data.created_by_user_name },
            { label: 'Requested On', value: data.created_at_human },
            { label: 'Request Status', value: data.request_status }
        ]"
    />
</template>

<style scoped>

</style>
