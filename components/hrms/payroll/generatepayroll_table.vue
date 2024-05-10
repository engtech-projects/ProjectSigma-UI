<script setup>
import { storeToRefs } from "pinia"
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"

const genpayrollstore = useGeneratePayrollStore()
const { generatePayroll, list: GPList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(genpayrollstore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
}

const setEdit = (genall) => {
    isEdit.value = true
    generatePayroll.value = genall
}

const deleteReq = async (req) => {
    try {
        boardLoading.value = true
        await genPayrolls.deleteRequest(req.id)
        snackbar.add({
            type: "success",
            text: genPayrolls.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}
// const searchField = ["employee_id"]
// const searchValue = ref("")
// const itemsSelected = ref([])

// const sortBy = ["employee_id", "employee", "employment_type", "department", "position"]
// const sortType = ["desc", "asc"]

const headers = [
    { text: "Employee ID", value: "employee_id", sortable: true },
    { text: "Employee", value: "employee", sortable: true },
    { text: "Employment Type", value: "employment_type", sortable: true },
    { text: "Office/Project", value: "department", sortable: true },
    { text: "Position", value: "position", sortable: true },
    { text: "View Payslip", value: "actions" },
]

</script>

<template>
    <LayoutBoards title="Generate Allowance List" class="w-full" :loading="boardLoading">
        <!-- <HrmsPayrollAllowanceFilterSelector /> -->
        <div class="pb-2 text-gray-500 p-2">
            <!-- <pre>{{ GAList }}</pre> -->
            <LayoutPsTable :header-columns="headers" :datas="GPList" @edit-row="setEdit" @delete-row="deleteReq" />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
        <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="success-message text-green-600 text-center font-semibold italic"
        >
            {{ successMessage }}
        </p>
    </LayoutBoards>
</template>

<!-- <template>
    <label for="" class="text-xl font-semibold text-gray-900">Generate Payroll Form</label>
    <div class="mt-5 mb-6">
        <div class="flex">
            <div class="search">
                <div>
                    <label for="search" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
                    <input v-model="searchValue" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text">
                </div>
            </div>
        </div>
        <EasyDataTable
            v-model:items-selected="itemsSelected"
            class="mt-5"
            table-class-name="customize-table"
            :headers="headers"
            :items="items"
            :search-field="searchField"
            :search-value="searchValue"
            :sort-by="sortBy"
            :sort-type="sortType"
        >
            <template #header-employee_id="header">
                <div class="flex flex-col gap-4 text-left">
                    <div>
                        {{ header.text }}
                    </div>
                </div>
            </template>
            <template #header-employee="header">
                <div class="flex flex-col gap-4 text-left">
                    <div>
                        {{ header.text }}
                    </div>
                </div>
            </template>
            <template #header-employment_type="header">
                <div class="flex flex-col gap-4 text-left">
                    <div>
                        {{ header.text }}
                    </div>
                </div>
            </template>
            <template #header-department="header">
                <div class="flex flex-col gap-4 text-left">
                    <div>
                        {{ header.text }}
                    </div>
                </div>
            </template>
            <template #header-position="header">
                <div class="flex flex-col gap-4 text-left">
                    <div>
                        {{ header.text }}
                    </div>
                </div>
            </template>
            <template #item-actions="item">
                <button
                    @click="viewItem(item)"
                >
                    <Icon name="material-symbols:visibility-rounded" color="blue" class="w-5 h-5" />
                </button>
            </template>
        </EasyDataTable>
    </div>
</template> -->

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
