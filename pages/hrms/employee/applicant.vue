<script setup>
useHead({
    title: "Job Applicants",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_job_applicant,
        ])"
    >
        <div class="grid grid-cols-1 gap-4">
            <!-- <EmployeeManpowerEditRequest v-show="isEdit" /> -->
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_job_applicants_application_form,
                        ])"
                        title="Application Form"
                        target-id="addApplicant"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_job_applicants_job_applicants,
                        ])"
                        title="Job Applicants"
                        target-id="allApplicants"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="addApplicant">
                        <HrmsEmployeeJobApplicationForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="allApplicants">
                        <HrmsEmployeeJobAllApplicantList />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
