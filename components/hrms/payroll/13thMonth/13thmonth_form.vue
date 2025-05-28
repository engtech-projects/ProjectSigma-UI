<script setup lang="ts">
const generateDraftRequest = ref({
    data: {

    } as any,
})
const dateChanged = computed(() => {
    if (generateDraftRequest.value.data.cutoff_start && generateDraftRequest.value.data.cutoff_end) {
        generateDraftRequest.value.data.total_days = 1
        const dateStart = new Date(generateDraftRequest.value.data.cutoff_start)
        const dateEnd = new Date(generateDraftRequest.value.data.cutoff_end)
        const dsMin = dateStart.setMinutes(dateStart.getMinutes() - dateStart.getTimezoneOffset())
        const deMin = dateEnd.setMinutes(dateEnd.getMinutes() - dateEnd.getTimezoneOffset())
        generateDraftRequest.value.data.total_days = (deMin - dsMin) / (24 * 60 * 60 * 1000) + 1
    }
})
</script>
<template>
    <div class="flex flex-col gap-2">
        <HrmsCommonDetailedMultipleEmployeeSelector v-model="generateDraftRequest.data.employee_ids" title="Employee Name" name="Employee Name" />
        <div class="w-full flex gap-2 md:flex-row flex-col">
            <LayoutFormPsDateInput v-model="generateDraftRequest.data.cutoff_start" class="w-full" title="Cut-off Date (Start)" @change="dateChanged" />
            <LayoutFormPsDateInput v-model="generateDraftRequest.data.cutoff_end" class="w-full" title="Cut-off Date (End)" @change="dateChanged" />
            <LayoutFormPsDateInput v-model="generateDraftRequest.data.release_date" class="w-full" title="Release Date" />
        </div>
        <div v-if="false" class="w-full flex gap-2 md:flex-row flex-col">
            <HrmsCommonDepartmentProjectSelector
                v-model:select-type="generateDraftRequest.data.charging_type"
                v-model:department-id="generateDraftRequest.data.department_id"
                v-model:project-id="generateDraftRequest.data.project_id"
                class="md:w-1/3 w-full"
                title="Charging"
            />
        </div>
        <div class="w-full flex gap-2 md:flex-row flex-col">
            <div class="w-full md:w-1/5">
                <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Generate 13th Month
                </button>
            </div>
        </div>
    </div>
</template>
