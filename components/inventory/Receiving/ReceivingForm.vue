<script setup>
// import { useReceivingStore, APPROVALS } from "@/stores/inventory/receiving"
// import { useApprovalStore } from "@/stores/hrms/setup/approvals"

// const mainStore = useReceivingStore()
// const { approvalList } = storeToRefs(mainStore)
// mainStore.fetchReceivings()

const form = defineModel({ required: true, type: Object })

// const approvals = useApprovalStore()
// approvalList.value.list = await approvals.getApprovalByName(APPROVALS)

// const snackbar = useSnackbar()

</script>
<template>
    <div class="text-gray-500 p-2">
        <div class="flex flex-col gap-4 pt-4 w-full">
            <div class="flex flex-col gap-4 mb-5">
                <div class="flex flex-row justify-between gap-4">
                    <div class="w-full flex flex-col gap-2">
                        <InventoryWarehouseWithReceiving
                            v-model="form.warehouse_id"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
