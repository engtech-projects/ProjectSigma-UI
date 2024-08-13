<script setup>
defineProps({
    employees: {
        type: Array,
        required: true,
    },
})
// const date = ref()
</script>
<template>
    <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col justify-evenly gap-2">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b">
                Late This Month
            </h5>
        </div>
        <div class="mt-5 overflow-auto min-h-96 max-h-96">
            <div class="grid grid-cols-3 md:grid-cols-4 justify-start mt-4 gap-4 p-2">
                <div v-if="employees.length <= 0">
                    No Lates found this month.
                </div>
                <div v-for="employee, index in employees" :key="index" class="flex flex-col items-center">
                    <HrmsDashboardLatesItem
                        title="Generate Memo"
                        :name="employee.fullname_first"
                        :avatar="employee.profile_photo && employee.profile_photo.base64 !== 'File doesn\'t exists.' ? employee.profile_photo.base64 : '/avatarexample.png'"
                        :late="employee.lates"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
