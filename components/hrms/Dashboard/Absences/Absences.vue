<template>
    <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col justify-evenly gap-2">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b">
                Absences This Month
            </h5>
            <div class="flex flex-col gap-2">
                <label class="" for="">Date Filter:</label>
                <VueDatePicker v-model="date" range class="z-15" />
            </div>
        </div>
        <div class="mt-5 overflow-auto min-h-96 max-h-96">
            <div class="grid grid-cols-4 justify-start mt-4 gap-4 p-2">
                <div v-for="(employee, index) in employees" :key="i0ndex" class="flex flex-col items-center">
                    <HrmsDashboardAbsencesItem
                        title="Generate Memo"
                        :name="employee.name"
                        :avatar="employee.avatar"
                        :absences="employee.absences"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker"
export default {
    props: {
        employees: Array, // An array of employee objects with properties: name, avatar, birthdate
    },
    methods: {
        formatDate (date) {
            const options = { month: "long", day: "numeric", year: "numeric" }
            return new Date(date).toLocaleDateString(undefined, options)
        },
    },
}
</script>
