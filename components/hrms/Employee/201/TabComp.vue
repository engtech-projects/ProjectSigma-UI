<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()
const { editable } = storeToRefs(employee)
const setEdit = () => {
    editable.value = !editable.value
}
</script>
<template>
    <div class="flex md:flex-row flex-col">
        <div class="w-full md:w-1/3">
            <HrmsEmployee201SearchProfile />
        </div>
        <div class="w-full md:w-2/3">
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_201_PIS,
                        ])"
                        title="PIS"
                        target-id="pis201"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_201_staff_information_sheet,
                        ])"
                        title="Staff Information Sheet"
                        target-id="staffInformationSheet"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_201_documents_memos,
                        ])"
                        title="Documents and Memos"
                        target-id="DocumentAndMemos"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_201_id,
                        ])"
                        title="Employee Identification Card"
                        target-id="EmployeeIdentificationCard"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer
                        id="pis201"
                    >
                        <HrmsEmployee201PersonnelInfoSheet />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        id="staffInformationSheet"
                    >
                        <HrmsEmployee201StaffInfoSheet />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        id="DocumentAndMemos"
                    >
                        <HrmsEmployee201DocumentsMemo />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        id="EmployeeIdentificationCard"
                    >
                        <div v-if="employee.information.id">
                            <HrmsEmployee201IdentificationCard />
                            <LayoutFormPsSignaturePad v-if="editable" />
                        </div>
                        <div v-else>
                            <p class="text-lg text-gray-400">
                                Employee Identification Card
                            </p>
                        </div>
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
            <div v-show="employee.information.id" class="w-full p-2">
                <label class="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        class="sr-only peer"
                        :checked="editable"
                        @change="setEdit()"
                    >
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Edit Employee</span>
                </label>
            </div>
        </div>
    </div>
</template>
