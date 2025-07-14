<script setup>
import { useBOMStore, APPROVALS } from "@/stores/inventory/bom"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"

const BOMStore = useBOMStore()
const approvals = useApprovalStore()
const { bomRequest, approvalList } = storeToRefs(BOMStore)

approvalList.value.list = await approvals.getApprovalByName(APPROVALS)

const today = new Date()
const currentYear = today.getFullYear()
const snackbar = useSnackbar()

const headers = [
    { name: "Item", id: "item_id" },
    { name: "Unit", id: "uom_id" },
    { name: "Price", id: "price" },
    { name: "Quantity", id: "quantity" },
    { name: "Amount", id: "amount" },
    { name: "Action", id: "" },
]

const storeBOM = async () => {
    if (bomRequest.value.details.length >= 1) {
        try {
            bomRequest.value.formDepartment.assignment_type = "Department"
            bomRequest.value.formDepartment.effectivity = String(currentYear)
            bomRequest.value.formDepartment.details = bomRequest.value.details
            bomRequest.value.formDepartment.approvals = approvalList.value.list
            await BOMStore.storeBOMDepartment()
            snackbar.add({
                type: BOMStore.errorMessage ? "error" : "success",
                text: BOMStore.errorMessage || BOMStore.successMessage,
            })
            if (!BOMStore.errorMessage) { BOMStore.$reset() }
        } catch {
            snackbar.add({
                type: "error",
                text: BOMStore.errorMessage || "An error occurred while submitting the request.",
            })
        }
    } else {
        snackbar.add({
            type: "error",
            text: "No BOM Request.",
        })
    }
}
</script>

<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <h5 class="text-xl font-semibold text-gray-800 dark:text-white border-b px-6 py-4">
            Form Request
        </h5>

        <form class="p-6" @submit.prevent="storeBOM">
            <div class="space-y-6 text-gray-700 dark:text-gray-300 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InventoryCommonFormAssignmentFilter
                        v-model="bomRequest.formDepartment"
                        :with-year="false"
                    />
                    <div>
                        <label for="year" class="block text-sm font-medium mb-1">Year :</label>
                        <input
                            id="year"
                            v-model="currentYear"
                            type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled
                        >
                    </div>
                </div>
            </div>

            <div class="mb-6 min-h-[200px] transition-all duration-300 ease-in-out">
                <InventoryBomItemTable
                    title="Item List"
                    :header-columns="headers"
                    :data-columns="bomRequest"
                />
            </div>

            <div class="space-y-6 text-gray-700 dark:text-gray-300">
                <div class="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                    <label class="block text-sm font-medium text-gray-800 dark:text-white mb-2">Approval:</label>
                    <div class="space-y-2">
                        <HrmsSetupApprovalsList
                            v-for="(approv, apr) in approvalList.list"
                            :key="'approval_' + apr"
                            v-model="approvalList.list[apr]"
                        />
                    </div>
                </div>

                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
                    >
                        Submit Request
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
