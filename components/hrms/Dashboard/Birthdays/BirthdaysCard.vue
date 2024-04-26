<script setup>
defineProps({
    employees: {
        type: Array,
        required: true,
    },
})
</script>
<template>
    <LayoutBoards title="Birthdays This Month">
        <div class="grid grid-cols-4 justify-start mt-4 gap-4 p-2">
            <div v-if="employee.length <= 0">
                No birthdays found this month.
            </div>
            <HrmsDashboardBirthdaysItem
                v-for="employee, index in employees"
                :key="index"
                :name="employee.fullname_last"
                :avatar="employee.avatar"
                :birthday="employee.date_of_birth"
            />
        </div>
    </LayoutBoards>
</template>

