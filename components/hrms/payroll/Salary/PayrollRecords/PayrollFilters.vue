<script setup lang="ts">
import { PAYROLL_TYPE, RELEASE_TYPE } from "@/stores/hrms/payroll/generatePayroll"
import { usePayrollStore } from "@/stores/hrms/payroll/payroll"

const snackbar = useSnackbar()
const payrollStore = usePayrollStore()
const { allRecords } = storeToRefs(payrollStore)
const grouptype = ref()
const getDatas = async () => {
    try {
        await payrollStore.getAllRecords()
        snackbar.add({
            type: "success",
            text: allRecords.value.successMessage ?? "Sucessfully fetched payroll records."
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
</script>
<template>
    <form
        class="mt-5 mb-5 grid grid-cols-1 gap-6 sm:grid-cols-5"
        @submit.prevent="getDatas()"
    >
        <LayoutFormPsDateInput
            v-model="allRecords.params.payroll_date"
            title="Payroll Date"
            :required="true"
        />
        <HrmsCommonDepartmentProjectSelector
            v-model:select-type="grouptype"
            v-model:department-id="allRecords.params.departmentId"
            v-model:project-id="allRecords.params.projectId"
            title="Charging"
            class="p-2"
        />
        <LayoutFormPsSelect
            v-model="allRecords.params.payrollType"
            :options-list="['all',...PAYROLL_TYPE]"
            title="Payroll Type"
            class="p-2"
        />
        <LayoutFormPsSelect
            v-model="allRecords.params.releaseType"
            :options-list="['all',...RELEASE_TYPE]"
            title="Release Type"
            class="p-2"
        />
        <div class="p-2 div flex items-end">
            <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm px-2.5 py-2 text-center rounded-lg"
            >
                <Icon name="ion:search" color="white" class="rounded h-7 w-8 p-1" />
            </button>
        </div>
    </form>
</template>
