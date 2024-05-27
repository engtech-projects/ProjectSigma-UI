<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
enums.getSalarygradeEnums()
enums.getDepartmentEnums()
enums.getPositionEnums()
enums.getEmployeeEnum()
enums.getUserEmployeeEnums()
useHead({
    title: "Personal Action Notice",
})

const pan = usePersonelActionNotice()
pan.fetchPersonelActionList()
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_personnel_action_notice,
        ])"
    >
        <div class="w-full">
            <div class="text-2xl font-normal mb-4 mt-10 md:mt-0">
                Personnel Action Form
            </div>
            <hr>
            <div class="md:flex gap-4">
                <HrmsEmployeePanPersonelActionForm />
                <div class="w-2/3">
                    <HrmsEmployeePanAllPanList />
                    <HrmsEmployeePanApprovalList />
                    <HrmsEmployeePanMyPanList />
                </div>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
