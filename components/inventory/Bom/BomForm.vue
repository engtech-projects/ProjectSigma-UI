<script setup>
import { useBOMStore, APPROVALS } from "@/stores/inventory/bom"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"
const BOMStore = useBOMStore()
const approvals = useApprovalStore()
const { bomRequest, approvalList } = storeToRefs(BOMStore)
approvalList.value.list = await approvals.getApprovalByName(APPROVALS)

const today = new Date()
const currentYear = today.getFullYear()
const headers = [
    { name: "Item", id: "item_id" },
    { name: "Unit", id: "uom_id" },
    { name: "Price", id: "price" },
    { name: "Quantity", id: "quantity" },
    { name: "Amount", id: "amount" },
]
const storeBOM = () => {
    bomRequest.value.formDepartment.assignment_type = "Department"
    bomRequest.value.formDepartment.details = bomRequest.value.details
}
</script>
<template>
    <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b p-2">
        Form Request
    </h5>
    <div class="text-gray-500 p-2">
        <form @submit.prevent="storeBOM">
            <div class="flex flex-col gap-4 pt-4 w-full">
                <div class="flex flex-col gap-4 mb-5 max-w-2xl">
                    <div class="flex flex-row gap-4 justify-start items-center">
                        <div class="flex flex-row justify-center items-center">
                            <label class="text-">Assignment :</label>
                        </div>
                        <div>
                            <HrmsCommonDepartmentSelector v-model="bomRequest.formDepartment.assignment_id" />
                        </div>
                    </div>
                    <div class="flex flex-row gap-2 justify-start items-center">
                        <div>
                            <label> Year : </label>
                        </div>
                        <div>
                            <input id="year" v-model="currentYear" type="text" class="bg-gray-50 border disabled:opacity-75 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled>
                        </div>
                    </div>
                </div>
                <div class="flex w-full">
                    <InventoryBomItemTable title="Item List" :header-columns="headers" :data-columns="bomRequest" />
                </div>
                <div class="flex w-full">
                    <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white"> Approval:</label>
                        <HrmsSetupApprovalsList
                            v-for="(approv, apr) in approvalList.list"
                            :key="'hrmsetupapprovallist' + apr"
                            v-model="approvalList.list[apr]"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        class=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        @click="storeBOM"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
