<template>
    <div
        class="mt-5 border-t-4 border-t-teal-400 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto "
    >
        <label for="" class="text-xl font-semibold text-gray-900">Other Deduction List</label>
        <div class="w-full">
            <HrmsCommonSearchEmployeeSelector v-model="getParams.employee_id" />
        </div>
        <div class="w-full">
            <div class="mt-5 mb-6 ">
                <AccountingLoadScreen :is-loading="isLoading" />
                <EasyDataTable
                    class="mt-5"
                    :headers="headers"
                    :items="deductionsList"
                    :hide-footer="true"
                >
                    <template #item-actions="item">
                        <div class="flex flex-row gap-1">
                            <button @click="showDetails(item)">
                                <Icon
                                    name="material-symbols:visibility-rounded"
                                    color="white"
                                    class="bg-teal-700 rounded h-8 w-8 p-1"
                                />
                            </button>
                        </div>
                    </template>
                </EasyDataTable>
            </div>
            <div class="flex justify-center mx-auto">
                <CustomPagination
                    v-if="deductionsList.length"
                    :links="pagination"
                    @change-params="changePaginate"
                />
            </div>
        </div>
    </div>
</template>

<script setup>

const isLoading = ref(false)
const utils = useUtilities()
const emit = defineEmits(["fetched"])
const pagination = ref({})
const getParams = ref({})
const props = defineProps({
    tofetch: {
        type: Boolean,
        default: false
    },
})

const willfetch = computed(() => {
    return props.tofetch
})

watch(willfetch, async (newVal) => {
    if (newVal) {
        await fetchDeductions()
        emit("fetched")
    }
})

const headers = [
    { text: "Employee Name", value: "employee_name" },
    { text: "Date Filed", value: "created_at" },
    { text: "Deduction Name", value: "otherdeduction_name" },
    { text: "Amount to Deduct", value: "amount" },
    { text: "Term", value: "terms_of_payment" },
    { text: "Monthly Deduction", value: "installment_deduction" },
    // { text: "Action", value: "actions" },
]

const items = ref([])
const deductionsList = computed(() => {
    const list = []
    items.value.forEach((d) => {
        d.employee_name = d.employee.family_name + ", " + d.employee.first_name
        d.created_at = utils.value.dateToString(new Date(d.created_at))
        d.amount_to_pay = utils.value.formatCurrency(d.installment_amount)
        list.push(d)
    })
    return list
})

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const fetchDeductions = async () => {
    isLoading.value = true
    await useHRMSApi("/api/other-deduction/resource", {
        method: "GET",
        params: getParams.value,
        onResponseError: ({ response }) => {
            isLoading.value = false
            throw new Error(response._data.message)
        },
        onResponse: ({ response }) => {
            isLoading.value = false
            items.value = response._data.data.data
            pagination.value = {
                first_page: response._data.data.first_page_url,
                pages: response._data.data.links,
                last_page: response._data.data.last_page_url,
            }
        },
    })
}

fetchDeductions()

</script>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
