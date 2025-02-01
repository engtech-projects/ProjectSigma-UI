<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
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
    { name: "Section", id: "section", show: true },
    { name: "Salary Grade", id: "salary_grade", show: true },
]
const filteredList = computed(() => {
    return administrativeReports.value.list.filter(
        listItem => administrativeReports.value.itemFilters.some(
            filter => listItem[filter.type]?.toLowerCase().includes(filter.value?.toLowerCase())
        ) || administrativeReports.value.itemFilters.length <= 0
    )
})
</script>
<template>
    <div class="w-full flex flex-col">
        <div class="w-full flex gap-4 flex-row items-center mb-12">
            <HrmsReportsAdministrativeReportsDynamicFilter :list="administrativeReports.itemFilters" :types="administrativeReports.headers" />
        </div>
        <LayoutPrint>
            <LayoutLoadingContainer class="relative w-full" :loading="administrativeReports.isLoading">
                <table class="w-full table-auto border-collapse border border-gray-500 mb-20">
                    <thead class="w-full text-blue-600 text-md">
                        <tr class="w-full">
                            <th
                                v-for="header in administrativeReports.headers"
                                :key="header.name+'headerRow'"
                                class="w-full p-3 border-gray-500 border"
                                :class="header.style ?? ''"
                            >
                                <div class="w-full min-w-max">
                                    {{ header.name }}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tr v-for="dataValue, index in filteredList" :key="'EmployeeMasterList' + index" class="h-2">
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.employee_id }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.date_hired }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.family_name }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.first_name }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.middle_name }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.name_suffix }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.nick_name }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 py-1 text-sm text-center">
                            <div class="w-full min-w-max p-4">
                                {{ dataValue.present_address }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.permanent_address }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.mobile_number }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.date_of_birth }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.place_of_birth }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.citizenship }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.blood_type }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.gender }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.religion }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.civil_status }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.height }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.weight }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.father }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.mother }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.spouse }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.spouse_date_of_birth }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.spouse_occupation }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.date_of_marriage }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.children_summary }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.contact_person }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.contact_person_address }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.contact_person_contact_no }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.contact_person_relationship }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.employee_education_elementary }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.employee_education_secondary }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.employee_education_college }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.sss_number }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.phic_number }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.pagibig_number }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.tin_number }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ dataValue.work_location }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.current_position_name }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.section }}
                            </div>
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            <div class="w-full min-w-max">
                                {{ dataValue.salary_grade }}
                            </div>
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
