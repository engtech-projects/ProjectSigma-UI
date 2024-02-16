<script lang="ts" setup>
const { token } = useAuth()
const config = useRuntimeConfig()
const errorMessage = ref(null)
const successMessage = ref(null)
const selectedEmployeeDetails = ref(false)

const headers = [
    { text: "EMPLOYEE NAME", value: "employee_name" },
    { text: "DEPARTMENT", value: "department_name" },
    { text: "ACTION TO BE TAKEN", value: "action_taken" },
    { text: "ACTIONS", value: "actions" },
]

const employees = [
    {
        employee_name: "Juan Luna",
        department_name: "Accounting",
        action_taken: "BASIC SALARY",
        date_filed: "10/24/23",
        action_button: "1230",
    },
]
const handleUploadEmployeesData = async (event : any) => {
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
                if (response.status !== 200) {
                    errorMessage.value = response._data.message
                } else {
                    successMessage.value = response._data.message
                }
            },
        }
    )
    selectedEmployeeDetails.value = true
}

const closeViewModal = () => {
    // Close the modal by resetting the selected item details
    selectedEmployeeDetails.value = false
}
</script>
<template>
    <div class="item-center">
        <label class="block mb-2 text-sm font-medium text-gray-100 dark:text-white text-center bg-green-600 p-4 border rounded border-green-950" for="bulk_upload_file">Upload CSV or Excel file</label>
        <input
            id="bulk_upload_file"
            class="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            @change="handleUploadEmployeesData"
        >
    </div>

    <div v-if="selectedEmployeeDetails">
        <div class="fixed inset-0 bg-black opacity-50 " />
        <div class="fixed inset-0 flex items-center justify-center ">
            <div class="bg-white p-8 min-w-full rounded-lg border border-slate-300">
                <h2 class="text-lg font-semibold mb-4">
                    Employee Details
                </h2>
                <EasyDataTable
                    show-index
                    :headers="headers"
                    :items="employees"
                    class="mt-5 z-0"
                />
                <button class="mt-4" @click="closeViewModal()">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>
