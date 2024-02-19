<script lang="ts" setup>

const { token } = useAuth()
const config = useRuntimeConfig()
const selectedEmployeeDetails = ref(false)
const boardLoading = ref(false)

const headers = [
    { text: "family name", value: "family_name" },
    { text: "first name", value: "first_name" },
    { text: "middle name", value: "middle_name" },
    { text: "name suffix", value: "name_suffix" },
    { text: "nick name", value: "nick_name" },
    { text: "pre street", value: "pre_street" },
    { text: "pre brgy", value: "pre_brgy" },
    { text: "pre city", value: "pre_city" },
    { text: "pre zip", value: "pre_zip" },
    { text: "pre province", value: "pre_province" },
    { text: "telephone number", value: "telephone_number" },
    { text: "mobile number", value: "mobile_number" },
    { text: "per street", value: "per_street" },
    { text: "per brgy", value: "per_brgy" },
    { text: "per city", value: "per_city" },
    { text: "per zip", value: "per_zip" },
    { text: "per province", value: "per_province" },
    { text: "date of birth", value: "date_of_birth" },
    { text: "place of birth", value: "place_of_birth" },
    { text: "citizenship", value: "citizenship" },
    { text: "blood type", value: "blood_type" },
    { text: "gender", value: "gender" },
    { text: "religion", value: "religion" },
    { text: "civil status", value: "civil_status" },
    { text: "date of marriage", value: "date_of_marriage" },
    { text: "height", value: "height" },
    { text: "weight", value: "weight" },
    { text: "phic number", value: "phic_number" },
    { text: "pagibig number", value: "pagibig_number" },
    { text: "tin number", value: "tin_number" },
    { text: "sss number", value: "sss_number" },
    { text: "father name", value: "father_name" },
    { text: "mother name", value: "mother_name" },
    { text: "spouse name", value: "spouse_name" },
    { text: "spouse datebirth", value: "spouse_datebirth" },
    { text: "spouse occupation", value: "spouse_occupation" },
    { text: "spouse contact no", value: "spouse_contact_no" },
    { text: "childrens", value: "childrens" },
    { text: "childrens date of birth", value: "childrens_date_of_birth" },
    { text: "person to contact name", value: "person_to_contact_name" },
    { text: "person to contact street", value: "person_to_contact_street" },
    { text: "person to contact brgy", value: "person_to_contact_brgy" },
    { text: "person to contact city", value: "person_to_contact_city" },
    { text: "person to contact zip", value: "person_to_contact_zip" },
    { text: "person to province", value: "person_to_province" },
    { text: "person to contact no", value: "person_to_contact_no" },
    { text: "person to contact relationship", value: "person_to_contact_relationship" },
    { text: "previous hospitalization", value: "previous_hospitalization" },
    { text: "previous operation", value: "previous_operation" },
    { text: "current undergoing treatment", value: "current_undergoing_treatment" },
    { text: "convicted crime", value: "convicted_crime" },
    { text: "dismissed resigned", value: "dismissed_resigned" },
    { text: "pending administrative", value: "pending_administrative" },
    { text: "name of relative working with", value: "name_of_relative_working_with" },
    { text: "relationship of relative working with", value: "relationship_of_relative_working_with" },
    { text: "position of relative working with", value: "position_of_relative_working_with" },
    { text: "elementary", value: "elementary" },
    { text: "name of school elementary", value: "name_of_school_elementary" },
    { text: "degree earned of school elementary", value: "degree_earned_of_school_elementary" },
    { text: "dates of school elementary", value: "dates_of_school_elementary" },
    { text: "honor of school elementary", value: "honor_of_school_elementary" },
    { text: "highschool", value: "highschool" },
    { text: "name of school highschool", value: "name_of_school_highschool" },
    { text: "degree earned of school highschool", value: "degree_earned_of_school_highschool" },
    { text: "dates of school highschool", value: "dates_of_school_highschool" },
    { text: "honor of school highschool", value: "honor_of_school_highschool" },
    { text: "college", value: "college" },
    { text: "name of school college", value: "name_of_school_college" },
    { text: "degree earned of school college", value: "degree_earned_of_school_college" },
    { text: "dates of school college", value: "dates_of_school_college" },
    { text: "honor of school college", value: "honor_of_school_college" },
    { text: "vocational", value: "vocational" },
    { text: "name of school vocational", value: "name_of_school_vocational" },
    { text: "degree earned of school vocational", value: "degree_earned_of_school_vocational" },
    { text: "dates of school vocational", value: "dates_of_school_vocational" },
    { text: "honor of school vocational", value: "honor_of_school_vocational" },
    { text: "master thesis name", value: "master_thesis_name" },
    { text: "master thesis date", value: "master_thesis_date" },
    { text: "doctorate desertation name", value: "doctorate_desertation_name" },
    { text: "doctorate desertation date", value: "doctorate_desertation_date" },
    { text: "professional license name", value: "professional_license_name" },
    { text: "professional license date", value: "professional_license_date" },
    { text: "reference name", value: "reference_name" },
    { text: "reference address", value: "reference_address" },
    { text: "reference posiiton", value: "reference_posiiton" },
    { text: "reference contact no", value: "reference_contact_no" },
    { text: "employee id", value: "employee_id" },
    { text: "company information", value: "company_information" },
    { text: "date hired", value: "date_hired" },
    { text: "employment status", value: "employment_status" },
    { text: "position", value: "position" },
    { text: "section program", value: "section_program" },
    { text: "department", value: "department" },
    { text: "division", value: "division" },
    { text: "supervisor", value: "supervisor" },
]

const employees : any = ref([])

const saveBulkUpload = async () => {
    const formData = new FormData()
    formData.append("employees_data", JSON.stringify(employees.value))
    await useFetch(
        "/api/employee-bulk-save",
        {
            baseURL: config.public.HRMS_API_URL,
            method: "POST",
            headers: {
                Authorization: token.value + "",
                Accept: "application/json"
            },
            body: formData,
            watch: false,
            onResponse: ({ response }) => {
                if (response.status >= 200 && response.status <= 299) {
                    employees.value = response._data?.data
                } else {
                    throw new Error(response._data.message)
                }
            },
        }
    )
    selectedEmployeeDetails.value = true
}
const handleUploadEmployeesData = async (event : any) => {
    boardLoading.value = true
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("employees-data", file)
    await useFetch(
        "/api/employee-bulk-upload",
        {
            baseURL: config.public.HRMS_API_URL,
            method: "POST",
            headers: {
                Authorization: token.value + "",
                Accept: "application/json"
            },
            body: formData,
            watch: false,
            onResponse: ({ response }) => {
                if (response.status >= 200 && response.status <= 299) {
                    employees.value = response._data?.data
                } else {
                    throw new Error(response._data.message)
                }
            },
        }
    )
    selectedEmployeeDetails.value = true
    boardLoading.value = false
}

const bodyRowClassNameFunction = (item: any) => {
    if (item.status === "duplicate") {
        return "duplicate-row"
    }
}

</script>
<template>
    <LayoutBoards title="Create New Type" :loading="boardLoading" class="w-full h-fit">
        <div class="min-w-full overflow-auto">
            <div class="flex gap-2 justify-end">
                <div class="w-full md:w-1/5">
                    <label class="w-full block mb-2 text-sm font-medium text-gray-100 dark:text-white text-center bg-green-600 p-2 border rounded border-green-950" for="bulk_upload_file">Upload CSV or Excel file</label>
                    <input
                        id="bulk_upload_file"
                        class="hidden text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        type="file"
                        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        @change="handleUploadEmployeesData"
                    >
                </div>
                <div class="w-full md:w-1/5">
                    <button
                        class="w-full block mb-2 text-sm font-medium text-gray-100 dark:text-white text-center bg-blue-500 hover:bg-blue-400 p-2 border rounded border-blue-950"
                        @click="saveBulkUpload()"
                    >
                        Save
                    </button>
                </div>
            </div>
            <EasyDataTable
                show-index
                :headers="headers"
                :body-row-class-name="bodyRowClassNameFunction"
                :items="employees"
                class="mt-5 z-0"
            />
        </div>
    </LayoutBoards>
</template>

<style>
.duplicate-row {
    --easy-table-body-row-background-color: #f56c6c;
    --easy-table-body-row-font-color: #fff;
}
</style>
