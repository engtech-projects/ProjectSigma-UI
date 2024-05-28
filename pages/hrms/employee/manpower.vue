<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
import { useEnumsStore } from "@/stores/hrms/enum"

const enums = useEnumsStore()
const manpowers = useManpowerStore()
const { isEdit } = storeToRefs(manpowers)
manpowers.getManpower()
manpowers.getMyRequests()
manpowers.getMyApprovalRequests()
enums.getPositionEnums()
enums.getDepartmentEnums()
enums.getPositionEnums()
enums.getDepartmentEnums()
enums.getUserEmployeeEnums()

useHead({
    title: "Manpower Request",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_manpower_request,
        ])"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <HrmsEmployeeManpowerAddRequest v-show="!isEdit" />
                <!-- <EmployeeManpowerEditRequest v-show="isEdit" /> -->
            </div>
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpower_request,
                        ])"
                        title="All List"
                        target-id="allListManpower"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpower_request,
                        ])"
                        title="My Approvals"
                        target-id="myReleasesManpower"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpower_request,
                        ])"
                        title="My Request"
                        target-id="myApprovalsManpower"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer
                        id="allListManpower"
                    >
                        <HrmsEmployeeManpowerMonitoringList />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        id="myReleasesManpower"
                    >
                        <HrmsEmployeeManpowerMyApprovals />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        id="myApprovalsManpower"
                    >
                        <HrmsEmployeeManpowerMyRequests />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
