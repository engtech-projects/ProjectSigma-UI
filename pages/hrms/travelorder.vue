<script setup>
import { useTravelorderStore } from "@/stores/hrms/travelorder"
import { useEnumsStore } from "@/stores/hrms/enum"

const travels = useTravelorderStore()
const { isEdit } = storeToRefs(travels)
travels.getMyRequests()
travels.getMyApprovalRequests()
travels.getTravelorders()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getUserEmployeeEnums()
enums.getDepartmentEnums()
enums.getProjectEnums()
useHead({
    title: "Travel Order",
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_lnotnto_travel_order_group,
        ])"
    >
        <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <div>
                <HrmsTravelOrderRequestForm v-show="!isEdit" />
                <!-- <HrmsTravelOrderEditRequest v-show="isEdit" /> -->
            </div>
            <div>
                <HrmsTravelOrderTabList />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
