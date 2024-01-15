<template>
    <LayoutBoards title="Birthdays This Month">
        <div class="grid grid-cols-4 justify-start mt-4 gap-4 p-2">
            <HrmsDashboardBirthdaysItem
                v-for="employee, index in employees"
                :key="index"
                :name="employee.name"
                :avatar="employee.avatar"
                :birthday="employee.birthday"
            />
        </div>
    </LayoutBoards>
</template>

<script setup>
defineProps({
    employees: {
        type: Array,
        required: true,
    },
})
</script>
