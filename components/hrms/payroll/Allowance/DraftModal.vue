<script setup>
import { storeToRefs } from "pinia"
import DraftModalRow from "./DraftModalRow.vue"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"

const showModal = defineModel("showModal", { required: false, type: Boolean })

const resourceStore = useGenerateAllowanceStore()
const { createAllowanceRequest } = storeToRefs(resourceStore)

const snackbar = useSnackbar()

const closeViewModal = () => {
    showModal.value = false
}
const submitRequest = async () => {
    try {
        await resourceStore.createRequest()
        snackbar.add({
            type: "success",
            text: "Success created Allowance Request."
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}

</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="createAllowanceRequest.isLoading" title="Allowance Request">
        <template #body>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Charging:
                    </span>
                    <span class="text-gray-900">
                        {{ createAllowanceRequest.data.charge_name }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Cutoff Start:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ createAllowanceRequest.data.cutoff_start_human }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Cutoff End:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ createAllowanceRequest.data.cutoff_end_human }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Allowance Date:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ createAllowanceRequest.data.allowance_date_human }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Total # of Day(s):
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ createAllowanceRequest.data.total_days }}
                    </span>
                </div>
            </div>
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr class="border">
                        <th class="p-2">
                            Employee
                        </th>
                        <th class="p-2">
                            Employee Position
                        </th>
                        <th class="p-2">
                            Allowance Rate
                        </th>
                        <th class="p-2">
                            Allowance Day(s)
                        </th>
                        <th class="p-2">
                            Allowance Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <DraftModalRow
                        v-for="employee_allowance, ind in createAllowanceRequest.data.employee_allowances"
                        :key="ind+'draftallowanceitem'"
                        v-model="createAllowanceRequest.data.employee_allowances[ind]"
                        class="border"
                    />
                </tbody>
            </table>
        </template>
        <template #footer>
            <button
                type="submit"
                class="m-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                @click="submitRequest()"
            >
                Submit
            </button>
        </template>
    </PsModal>
</template>
