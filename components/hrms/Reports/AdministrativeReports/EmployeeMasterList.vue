<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { EmployeeMasterList, administrativeReportOption } = storeToRefs(generateReportstore)
watch(EmployeeMasterList.value.params, async () => {
    await generateReportstore.getEmployeeMasterList()
})
const headers = [
    { name: "Employee ID", id: "employee_id" },
    { name: "Date Hired", id: "date_hired" },
    { name: "Last Name", id: "family_name" },
    { name: "First Name", id: "first_name" },
    { name: "Middle Name", id: "middle_name" },
    { name: "Suffix", id: "name_suffix" },
    { name: "Nickname", id: "nick_name" },
    { name: "Present Address", id: "present_address" },
    { name: "Permanent Address", id: "permanent_address" },
    { name: "Cellphone", id: "mobile_number" },
    { name: "Date of Birth", id: "date_of_birth" },
    { name: "Place of Birth", id: "place_of_birth" },
    { name: "Citizenship", id: "citizenship" },
    { name: "Blood Type", id: "blood_type" },
    { name: "Gender", id: "gender" },
    { name: "Religion", id: "religion" },
    { name: "Civil Status", id: "civil_status" },
    { name: "Height", id: "height" },
    { name: "Weight", id: "weight" },
    { name: "Father's Name", id: "father" },
    { name: "Mother's Name", id: "mother" },
    { name: "Name of Spouse", id: "spouse" },
    { name: "Spouse's Date of Birth", id: "spouse_date_of_birth" },
    { name: "Spouse's Occupation", id: "spouse_occupation" },
    { name: "Date of Marriage", id: "date_of_marriage" },
    { name: "Children (Name and Birthday)", id: "child" },
    { name: "Person to Contact Name", id: "contact_person" },
    { name: "Person to Contact Address", id: "contact_person_address" },
    { name: "Person to Contact Number", id: "contact_person_contact_no" },
    { name: "Person to Contact Relationship", id: "contact_person_relationship" },
    { name: "Primary Education", id: "employee_education_elementary" },
    { name: "Secondary Education", id: "employee_education_secondary" },
    { name: "Tertiary Education", id: "employee_education_college" },
    { name: "SSS #", id: "sss_number" },
    { name: "Philhealth #", id: "phic_number" },
    { name: "Pag-ibig #", id: "pagibig_number" },
    { name: "TIN", id: "tin_number" },
    { name: "Current Work Location (Department name/ Project Code)", id: "work_location" },
    { name: "Current Position", id: "current_position_name" },
]
</script>
<template>
    <div class="flex flex-col">
        <div class="header flex flex-col mb-8">
            <div class="flex gap-4 flex-row items-center max-w-sm">
                <HrmsReportsAdministrativeReportsAllDepartmentProjectSelector
                    v-model:select-type="EmployeeMasterList.params.group_type"
                    v-model:department-id="EmployeeMasterList.params.department_id"
                    v-model:project-id="EmployeeMasterList.params.project_id"
                    title="Category"
                />
            </div>
        </div>
        <LayoutPrint>
            <div class="title flex flex-col justify-center gap-1 mb-12">
                <span v-show="administrativeReportOption.report_type === 'employee-tenureship'" class="text-2xl font-bold text-black text-left">
                    Employee Tenureship Report
                </span>
                <span v-show="administrativeReportOption.report_type === 'employee-masterlist'" class="text-2xl font-bold text-black text-left">
                    Employee Masterlist Report
                </span>
            </div>
            <table class="printTable table-auto w-full border-collapse border border-gray-500 mb-20">
                <thead class="text-blue-600 text-md">
                    <tr class="py-4">
                        <th
                            v-for="header in headers"
                            :key="header.name+'headerRow'"
                            class="px-2 py-4 border-gray-500 border"
                            :class="header.style ?? ''"
                        >
                            {{ header.name }}
                        </th>
                    </tr>
                </thead>
                <tr v-for="dataValue, index in EmployeeMasterList.list" :key="'EmployeeMasterList' + index" class="h-2">
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
                        <template v-for="childDataValue, childDataIndex in dataValue.child" :key="'childList' + childDataIndex">
                            <p>
                                {{ childDataValue.name + childDataValue.date_of_birth }}
                            </p>
                        </template>
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
        </LayoutPrint>
    </div>
</template>
<style scoped>
    .flex-5 {
        flex: 5;
    }
</style>
