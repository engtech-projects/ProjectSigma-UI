<script lang="ts" setup>
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"
const genallowStore = useGenerateAllowanceStore()
const { allowanceRecords } = storeToRefs(genallowStore)
const getDatas = () => {
    genallowStore.getAllowanceRecords()
}
</script>
<template>
    <div>
        <div class="flex flex-row">
            <HrmsCommonDepartmentProjectSelector
                v-model:select-type="allowanceRecords.params.group_type"
                v-model:projectId="allowanceRecords.params.project_id"
                v-model:departmentId="allowanceRecords.params.department_id"
            />
        </div>
        <div class="flex flex-row">
            <LayoutFormPsDateInput
                v-model="allowanceRecords.params.allowance_date"
                title="Allowance Date"
            />
        </div>
        <button
            type="submit"
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            @click.prevent="getDatas"
        >
            View Records
        </button>
    </div>
</template>
