<script setup>
import { useWithdrawalStore, APPROVALS } from "@/stores/inventory/withdrawal"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"

const mainStore = useWithdrawalStore()
const { approvalList, withdrawal } = storeToRefs(mainStore)
// mainStore.fetchWithdrawals()

const form = defineModel({ required: true, type: Object })

const approvals = useApprovalStore()
approvalList.value.list = await approvals.getApprovalByName(APPROVALS)

const snackbar = useSnackbar()

const storeWithdrawalForm = async () => {
    try {
        form.value.items = mainStore.withdrawal.items

        if (!form.value.items || form.value.items.length === 0) {
            snackbar.add({
                type: "error",
                text: "Please add items before submitting the request.",
            })
            return
        }

        form.value.approvals = approvalList.value.list
        await mainStore.storeRequest()

        if (mainStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: mainStore.errorMessage,
            })
        } else {
            snackbar.add({
                type: "success",
                text: mainStore.successMessage,
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.message || error,
        })
    }
}
const headers = [
    { name: "QTY", id: "quantity" },
    { name: "UNIT", id: "unit" },
    { name: "ITEM CODE", id: "item_code" },
    { name: "ITEM DESCRIPTION", id: "item_id" },
    { name: "PURPOSE OF WITHDRAWAL", id: "purpose" },
]
const withdrawFrom = ref("Main Warehouse")
</script>
<template>
    <!-- <pre>{{ form }}</pre> -->
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeWithdrawalForm">
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div class="flex flex-col gap-4 mb-5">
                    <div class="flex flex-row justify-between gap-4">
                        <div class="w-full flex flex-col gap-2">
                            <div class="w-full">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Date and Time
                                </label>
                                <div class="flex flex-row items-center gap-2">
                                    <LayoutFormPsDateInput
                                        v-model="form.date"
                                        :required="true"
                                        class="w-full"
                                    />
                                    <LayoutFormPsTimeInput
                                        v-model="form.time"
                                        :required="true"
                                        class="w-full"
                                    />
                                </div>
                            </div>
                            <div class="w-full">
                                <div class="w-full">
                                    <label
                                        for="warehouse-type"
                                        class="block mb-1 text-sm font-medium text-gray-900"
                                    >
                                        Withdraw From
                                    </label>
                                    <select
                                        id="warehouse-type"
                                        v-model="withdrawFrom"
                                        class="mt-1 block text-base text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="Main Warehouse">
                                            Main Warehouse
                                        </option>
                                        <option value="Site Warehouse">
                                            Site Warehouse
                                        </option>
                                    </select>
                                </div>

                                <div v-if="withdrawFrom === 'Main Warehouse'" class="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                                    <div class="w-full">
                                        <HrmsCommonDepartmentProjectSelector
                                            v-model:select-type="form.requesting"
                                            v-model:project-id="withdrawal.params.project_id"
                                            v-model:department-id="withdrawal.params.department_id"
                                            title="Requesting"
                                        />
                                    </div>
                                    <label class="block mb-2 text-sm font-medium text-gray-900">Charging</label>
                                    <p class="text-base font-semibold text-gray-700 indent-2">
                                        Main Warehouse
                                    </p>
                                </div>

                                <div v-if="withdrawFrom === 'Site Warehouse'" class="w-full mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                                    <div class="w-full flex gap-2">
                                        <div class="w-full">
                                            <HrmsCommonDepartmentProjectSelector
                                                v-model:select-type="form.requesting"
                                                v-model:project-id="withdrawal.params.project_id"
                                                v-model:department-id="withdrawal.params.department_id"
                                                title="Requesting"
                                            />
                                        </div>
                                    </div>
                                    <div class="w-full flex gap-2">
                                        <div class="w-full">
                                            <HrmsCommonDepartmentProjectSelector
                                                v-model:select-type="form.charging"
                                                v-model:project-id="withdrawal.params.project_id"
                                                v-model:department-id="withdrawal.params.department_id"
                                                title="Charging"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
                                    <InventoryWithdrawalItemTable
                                        title="Item List"
                                        :header-columns="headers"
                                        :data-columns="form.items"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex flex-col gap-2">
                            <LayoutFormPsTextInput v-model="form.equipment_no" :required="true" class="w-full" title="Equipment No." />
                            <LayoutFormPsTextInput v-model="form.smr" :required="true" class="w-full" title="SMR" />
                            <div>
                                <label
                                    for="diesel-withdrawal"
                                    class="block mb-1 text-sm font-medium text-gray-900"
                                >
                                    For Diesel Withdrawal
                                </label>
                                <select
                                    id="diesel-withdrawal"
                                    v-model="form.withdrawal_type"
                                    class="mt-1 block text-base text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">
                                        -- Select Option --
                                    </option>
                                    <option value="Full Tank">
                                        Full Tank
                                    </option>
                                    <option value="Partial">
                                        Partial
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full">
                        <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                            <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white"> Approval:</label>
                            <HrmsSetupApprovalsList
                                v-for="(approv, apr) in approvalList.list"
                                :key="'hrmsetupapprovallist' + approv"
                                v-model="approvalList.list[apr]"
                            />
                        </div>
                    </div>
                    <div class="flex w-full items-center gap-4">
                        <button
                            type="submit"
                            class=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
