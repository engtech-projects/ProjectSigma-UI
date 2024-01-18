<template>
    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
        <label for="" class="text-xl font-semibold text-gray-900">Leave Application Form</label>
        <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
            <div class="mb-6">
                <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input id="employee" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
            </div>
            <div class="mb-6">
                <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                <input id="department" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
            </div>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div class="mb-6">
                <label for="position" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                <input id="position" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
            </div>
            <div class="mb-6">
                <label for="date_filed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Filed</label>
                <input id="date_filed" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
            </div>
        </div>
        <div class="flex gap-7">
            <div class="w-3/5">
                <label for="" class="text-xl font-semibold text-gray-900">LEAVE AVAILMENT</label>
                <div class="flex gap-5">
                    <div class="w-1/2">
                        <div class="mt-5 flex items-center mb-4">
                            <input id="leave-availment-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="leave-availment-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sick / Check up</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="leave-availment-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="leave-availment-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Special Celebration</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="leave-availment-3" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="leave-availment-3" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vacation</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="leave-availment-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="leave-availment-4" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mandatory Leave</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="leave-availment-5" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="leave-availment-5" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bereavement</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="leave-availment-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="leave-availment-6" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Maternity / Paternity</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="leave-availment-7" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="leave-availment-7" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="other_absence_requested" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                        </div>
                        <div class="flex items-center mb-4">
                            <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
                                <div class="mb-6">
                                    <input id="leave-withpay-1" type="radio" value="" name="default-radio-2" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="leave-withpay-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">WITH PAY</label>
                                </div>
                                <div class="mb-6">
                                    <input id="leave-withpay-2" type="radio" value="" name="default-radio-2" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="leave-withpay-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">WITHOUT PAY</label>
                                </div>
                            </div>
                        </div>
                        <div class="mb-6">
                            <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">REASONS/REMARKS</label>
                            <input id="other_absence_requested" type="text" class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
                            <div class="mb-6">
                                <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of Days:</label>
                                <input id="employee" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                            </div>
                            <div class="mb-6">
                                <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of Hours:</label>
                                <input id="department" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                            </div>
                        </div>
                        <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
                            <div class="mb-6">
                                <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of Days:</label>
                                <input id="employee" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                            </div>
                            <div class="mb-6">
                                <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of Hours:</label>
                                <input id="department" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                            </div>
                        </div>
                        <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
                            <div class="mb-6">
                                <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time From:</label>
                                <input id="employee" type="time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                            </div>
                            <div class="mb-6">
                                <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time To:</label>
                                <input id="department" type="time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-2/5">
                <label for="" class="text-xl font-semibold text-gray-900">EMPLOYEE'S LEAVE RECORD (HRD use only)</label>
                <EasyDataTable
                    id="employee_leave_table"
                    class="mt-5"
                    :headers="headers"
                    :items="items"
                />
            </div>
        </div>
        <div class="max-w-full flex flex-row-reverse mt-5">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="submitAdd">
                Add
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Header, Item } from "vue3-easy-data-table"

const headers: Header[] = [
    { text: "CREDITS", value: "credits" },
    { text: "EARNED", value: "earned" },
    { text: "USED", value: "used" },
    { text: "BALANCE", value: "balance" },
]

const items: Item[any] = ref([
    {
        credits: "Vacation Leave",
        earned: "",
        used: "",
        balance: "",
    },
    {
        credits: "Sick Leave",
        earned: "",
        used: "",
        balance: "",
    },
    {
        credits: "Service Incentive Leave",
        earned: "",
        used: "",
        balance: "",
    },
    {
        credits: "Emergency Leave",
        earned: "",
        used: "",
        balance: "",
    },
    {
        credits: "Paternity Leave",
        earned: "",
        used: "",
        balance: "",
    },
    {
        credits: "Maternity Leave",
        earned: "",
        used: "",
        balance: "",
    },
    {
        credits: "Birthday Leave",
        earned: "",
        used: "",
        balance: "",
    },
    {
        credits: "Solo Parent Leave",
        earned: "",
        used: "",
        balance: "",
    },
    {
        credits: "Educational Leave",
        earned: "",
        used: "",
        balance: "",
    },
    {
        credits: "Menstrual Leave",
        earned: "",
        used: "",
        balance: "",
    },
    {
        credits: "Others",
        earned: "",
        used: "",
        balance: "",
    },
])
const submitAdd = () => {
}
</script>

<style scoped>

#employee_leave_table .vue3-easy-data-table__footer{
  display: none !important;
}

</style>
