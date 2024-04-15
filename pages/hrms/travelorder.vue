<script setup>
import { useTravelorderStore } from "@/stores/hrms/travelorder"
import { useEnumsStore } from "@/stores/hrms/enum"

const travels = useTravelorderStore()
const { isEdit } = storeToRefs(travels)
// travels.getMyRequests()
// travels.getMyApprovalRequests()
travels.getTravelorders()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getDepartmentEnums()
useHead({
    title: "Travel Order",
})
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <HrmsTravelOrderRequestForm v-show="!isEdit" />
            <!-- <HrmsTravelOrderEditRequest v-show="isEdit" /> -->
        </div>
        <div class="flex flex-col gap-2">
            <HrmsTravelOrderRequestList />
        </div>
    </div>
</template>
