<template>
    <EasyDataTable
        show-index
        :headers="tableheaders"
        :items="tabledata"
    >
        <template #item-actions="item">
            <!-- <button
            @click="$emit('deleteItem',item)"
            > -->
            <button
                @click="deleteItem(item)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" /></svg>
            </button>
            <button
                @click="editItem(item)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" /></svg>
            </button>
        </template>
    </EasyDataTable>
    <div class="edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
        <div class="mb-6">
            <label for="" class="text-xl font-semibold text-gray-900">WTAX Update</label>
        </div>
        <div class="mb-6">
            <label for="term" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Term</label>
            <select id="term" v-model="editingItem.term" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option selected>
                    Choose a Term
                </option>
                <option value="daily">
                    Daily
                </option>
                <option value="weekly">
                    Weekly
                </option>
                <option value="semi_monthly">
                    Semi-monthly
                </option>
                <option value="monthly">
                    Monthly
                </option>
            </select>
        </div>
        <div class="mb-6">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="salary_range_from" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary Range From</label>
                    <input
                        id="salary_range_from"
                        v-model="editingItem.salary_range_from"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                    >
                </div>
                <div>
                    <label for="salary_range_to" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary Range To</label>
                    <input
                        id="salary_range_to"
                        v-model="editingItem.salary_range_to"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                    >
                </div>
            </div>
        </div>
        <div class="mb-6">
            <label for="wtax_amt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wtax Amount</label>
            <input
                id="wtax_amt"
                v-model="editingItem.tax_amount"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
            >
        </div>
        <div class="mb-6">
            <label for="wtax_percent" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wtax Percent Overbase</label>
            <input
                id="wtax_percent"
                v-model="editingItem.over_salary_base"
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
            >
        </div>
        <div class="flex flex-row gap-5">
            <div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="submitEdit()">
                    Update
                </button>
            </div>
            <div>
                <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="clear()">
                    Clear
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>

const data = defineProps({
    tabledata: {
        type: Array,
        required: true,
    },
    tableheaders: {
        type: Array,
        required: true,
    },
})
const editingItem = reactive({
    term: "",
    status: "",
    compensation_range: "",
    salary_range_from: "",
    salary_range_to: "",
    salary_base: "",
    tax_amount: "",
    over_salary_base: "",
    id: 0,
})

const editItem = (val) => {
    const { term, status, compensationRange, salaryRangeFrom, salaryRangeTo, salaryBase, taxAmount, overSalaryBase, id } = val
    editingItem.term = term
    editingItem.status = status
    editingItem.compensation_range = compensationRange
    editingItem.salary_range_from = salaryRangeFrom
    editingItem.salary_range_to = salaryRangeTo
    editingItem.salary_base = salaryBase
    editingItem.tax_amount = taxAmount
    editingItem.over_salary_base = overSalaryBase
    editingItem.id = id
}

const clear = () => {
    editingItem.term = ""
    editingItem.status = ""
    editingItem.compensation_range = ""
    editingItem.salary_range_from = ""
    editingItem.salary_range_to = ""
    editingItem.salary_base = ""
    editingItem.tax_amount = ""
    editingItem.over_salary_base = ""
    editingItem.id = 0
}

const submitEdit = () => {
    const obj = data.tabledata.find(item => item.id === editingItem.id)
    obj.status = editingItem.status
    obj.compensation_range = editingItem.compensation_range
    obj.salary_range_from = editingItem.salary_range_from
    obj.salary_range_to = editingItem.salary_range_to
    obj.salary_base = editingItem.salary_base
    obj.tax_amount = editingItem.tax_amount
    obj.over_salary_base = editingItem.over_salary_base
    obj.id = editingItem.id
}

const deleteItem = () => {
    return null
}
</script>
