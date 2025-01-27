<script setup>
import { useGenerateReportStore, EMPLOYEE_MASTERLIST } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
watch(administrativeReports.value.params, async () => {
    if (administrativeReports.value.params.report_type === EMPLOYEE_MASTERLIST) {
        await generateReportstore.getAdministrativeReport()
    }
})
administrativeReports.value.filters = [
    {
        employee_id: null,
        date_hired: null,
        family_name: null,
        first_name: null,
        middle_name: null,
        name_suffix: null,
        nick_name: null,
        present_address: null,
        permanent_address: null,
        mobile_number: null,
        date_of_birth: null,
        place_of_birth: null,
        citizenship: null,
        blood_type: null,
        gender: null,
        religion: null,
        civil_status: null,
        height: null,
        weight: null,
        father: null,
        mother: null,
        spouse: null,
        spouse_date_of_birth: null,
        spouse_occupation: null,
        date_of_marriage: null,
        child: null,
        contact_person: null,
        contact_person_address: null,
        contact_person_contact_no: null,
        contact_person_relationship: null,
        employee_education_elementary: null,
        employee_education_secondary: null,
        employee_education_college: null,
        sss_number: null,
        phic_number: null,
        pagibig_number: null,
        tin_number: null,
        work_location: null,
        current_position_name: null,
    }
]
administrativeReports.value.headers = [
    { name: "Employee ID", id: "employee_id", show: true },
    { name: "Date Hired", id: "date_hired", show: true },
    { name: "Last Name", id: "family_name", show: true },
    { name: "First Name", id: "first_name", show: true },
    { name: "Middle Name", id: "middle_name", show: true },
    { name: "Suffix", id: "name_suffix", show: true },
    { name: "Nickname", id: "nick_name", show: true },
    { name: "Present Address", id: "present_address", show: true },
    { name: "Permanent Address", id: "permanent_address", show: true },
    { name: "Cellphone", id: "mobile_number", show: true },
    { name: "Date of Birth", id: "date_of_birth", show: true },
    { name: "Place of Birth", id: "place_of_birth", show: true },
    { name: "Citizenship", id: "citizenship", show: true },
    { name: "Blood Type", id: "blood_type", show: true },
    { name: "Gender", id: "gender", show: true },
    { name: "Religion", id: "religion", show: true },
    { name: "Civil Status", id: "civil_status", show: true },
    { name: "Height", id: "height", show: true },
    { name: "Weight", id: "weight", show: true },
    { name: "Father's Name", id: "father", show: true },
    { name: "Mother's Name", id: "mother", show: true },
    { name: "Name of Spouse", id: "spouse", show: true },
    { name: "Spouse's Date of Birth", id: "spouse_date_of_birth", show: true },
    { name: "Spouse's Occupation", id: "spouse_occupation", show: true },
    { name: "Date of Marriage", id: "date_of_marriage", show: true },
    { name: "Children (Name and Birthday)", id: "children_summary", show: true },
    { name: "Person to Contact Name", id: "contact_person", show: true },
    { name: "Person to Contact Address", id: "contact_person_address", show: true },
    { name: "Person to Contact Number", id: "contact_person_contact_no", show: true },
    { name: "Person to Contact Relationship", id: "contact_person_relationship", show: true },
    { name: "Primary Education", id: "employee_education_elementary", show: true },
    { name: "Secondary Education", id: "employee_education_secondary", show: true },
    { name: "Tertiary Education", id: "employee_education_college", show: true },
    { name: "SSS #", id: "sss_number", show: true },
    { name: "Philhealth #", id: "phic_number", show: true },
    { name: "Pag-ibig #", id: "pagibig_number", show: true },
    { name: "TIN", id: "tin_number", show: true },
    { name: "Current Work Location (Department name/ Project Code)", id: "work_location", show: true },
    { name: "Current Position", id: "current_position_name", show: true },
    { name: "Salary Grade", id: "salary_grade", show: true },
]
const filteredList = computed(() => {
    const newList = administrativeReports.value.list.filter(
        listItem => administrativeReports.value.itemFilters.some(
            filter => listItem[filter.type]?.toLowerCase().includes(filter.value?.toLowerCase())
        )
    )
    const withValueFilter = administrativeReports.value.itemFilters.every(item => item.type !== null && item.value !== null)
    const withFilter = administrativeReports.value.itemFilters.length > 0
    return !withFilter ? administrativeReports.value.list : (withValueFilter ? newList : administrativeReports.value.list)
})
</script>
<template>
    <div class="flex flex-col">
        <div class="header flex flex-col mb-8">
            <div class="w-full flex gap-4 flex-row items-center">
                <HrmsReportsAdministrativeReportsAllDepartmentProjectSelector
                    v-model:select-type="administrativeReports.params.group_type"
                    v-model:department-id="administrativeReports.params.department_id"
                    v-model:project-id="administrativeReports.params.project_id"
                    title="Category"
                />
                <HrmsReportsAdministrativeReportsDynamicFilter :list="administrativeReports.itemFilters" :types="administrativeReports.headers" />
            </div>
        </div>
        <LayoutPrint>
            <LayoutLoadingContainer :loading="administrativeReports.isLoading">
                <HrmsReportsAdministrativeReportsAdministrativeHeader />
                <table class="printTable table-auto w-full border-collapse border border-gray-500 mb-20">
                    <thead class="text-blue-600 text-md">
                        <tr class="py-4">
                            <th
                                v-for="header in administrativeReports.headers"
                                :key="header.name+'headerRow'"
                                class="px-2 py-4 border-gray-500 border"
                                :class="header.style ?? ''"
                            >
                                {{ header.name }}
                            </th>
                        </tr>
                    </thead>
                    <tr v-for="dataValue, index in filteredList" :key="'EmployeeMasterList' + index" class="h-2">
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.employee_id }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.date_hired }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.family_name }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.first_name }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.middle_name }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.name_suffix }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.nick_name }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.present_address }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.permanent_address }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.mobile_number }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.date_of_birth }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.place_of_birth }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.citizenship }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.blood_type }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.gender }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.religion }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.civil_status }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.height }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.weight }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.father }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.mother }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.spouse }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.spouse_date_of_birth }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.spouse_occupation }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.date_of_marriage }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.children_summary }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.contact_person }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.contact_person_address }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.contact_person_contact_no }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.contact_person_relationship }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.employee_education_elementary }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.employee_education_secondary }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.employee_education_college }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.sss_number }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.phic_number }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.pagibig_number }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.tin_number }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.work_location }}
                        </td>
                        <td class="border border-gray-500 h-8 py-1 px-2 text-sm text-center">
                            {{ dataValue.current_position_name }}
                        </td>
                    </tr>
                </table>
            </LayoutLoadingContainer>
        </LayoutPrint>
    </div>
</template>
<style scoped>
    .flex-5 {
        flex: 5;
    }
</style>
