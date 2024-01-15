<script  setup lang="ts">

import { Header, Item } from "vue3-easy-data-table"
import { initAccordions } from "flowbite"

useHead({
    title: "Withholding Tax",
})

onMounted(() => {
    initAccordions()
})

const headers: Header[] = [
    { text: "Range of Compensation", value: "status" },
    { text: "Emlpoyer Share", value: "compensation_range" },
    { text: "Employee Share", value: "salary_base" },
    { text: "Total Contributions", value: "tax_amount" },
    { text: "Total Contributions", value: "over_salary_base" },
    { text: "Actions", value: "actions" },
]
const main_items = [
    [
        {
            status: "status lorem1",
            compensation_range: "compensation_range lorem1",
            salary_base: "salary_base lorem1",
            tax_amount: "tax_amount lorem1",
            over_salary_base: "over_salary_base lorem1",
        },
        {
            status: "status lorem2",
            compensation_range: "compensation_range lorem2",
            salary_base: "salary_base lorem2",
            tax_amount: "tax_amount lorem2",
            over_salary_base: "over_salary_base lorem2",
        },
        {
            status: "status lorem3",
            compensation_range: "compensation_range lorem3",
            salary_base: "salary_base lorem3",
            tax_amount: "tax_amount lorem3",
            over_salary_base: "over_salary_base lorem3",
        },
    ],
    [
        {
            status: "status lorem1",
            compensation_range: "compensation_range lorem1",
            salary_base: "salary_base lorem1",
            tax_amount: "tax_amount lorem1",
            over_salary_base: "over_salary_base lorem1",
        },
        {
            status: "status lorem2",
            compensation_range: "compensation_range lorem2",
            salary_base: "salary_base lorem2",
            tax_amount: "tax_amount lorem2",
            over_salary_base: "over_salary_base lorem2",
        },
        {
            status: "status lorem3",
            compensation_range: "compensation_range lorem3",
            salary_base: "salary_base lorem3",
            tax_amount: "tax_amount lorem3",
            over_salary_base: "over_salary_base lorem3",
        }
    ],
    [
        {
            status: "status lorem1",
            compensation_range: "compensation_range lorem1",
            salary_base: "salary_base lorem1",
            tax_amount: "tax_amount lorem1",
            over_salary_base: "over_salary_base lorem1",
        },
        {
            status: "status lorem2",
            compensation_range: "compensation_range lorem2",
            salary_base: "salary_base lorem2",
            tax_amount: "tax_amount lorem2",
            over_salary_base: "over_salary_base lorem2",
        },
        {
            status: "status lorem3",
            compensation_range: "compensation_range lorem3",
            salary_base: "salary_base lorem3",
            tax_amount: "tax_amount lorem3",
            over_salary_base: "over_salary_base lorem3",
        }
    ],
    [
        {
            status: "status lorem1",
            compensation_range: "compensation_range lorem1",
            salary_base: "salary_base lorem1",
            tax_amount: "tax_amount lorem1",
            over_salary_base: "over_salary_base lorem1",
        },
        {
            status: "status lorem2",
            compensation_range: "compensation_range lorem2",
            salary_base: "salary_base lorem2",
            tax_amount: "tax_amount lorem2",
            over_salary_base: "over_salary_base lorem2",
        },
        {
            status: "status lorem3",
            compensation_range: "compensation_range lorem3",
            salary_base: "salary_base lorem3",
            tax_amount: "tax_amount lorem3",
            over_salary_base: "over_salary_base lorem3",
        }
    ],
]

const items_daily: Item[any] = ref(main_items[0])
const items_weekly: Item[any] = ref(main_items[1])
const items_semi_monthly: Item[any] = ref(main_items[2])
const items_monthly: Item[any] = ref(main_items[3])

const addItem = reactive({
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

const submitAdd = () => {
    // const obj = items_daily.value.find((item: { id: number; }) => item.id === addItem.id);
    // obj.status = addItem.status;
    // obj.compensation_range = addItem.compensation_range;
    // obj.salary_range_from = addItem.salary_range_from;
    // obj.salary_range_to = addItem.salary_range_to;
    // obj.salary_base = addItem.salary_base;
    // obj.tax_amount = addItem.tax_amount;
    // obj.over_salary_base = addItem.over_salary_base;
    // obj.id = addItem.id;
}

const clear = () => {
    addItem.term = ""
    addItem.status = ""
    addItem.compensation_range = ""
    addItem.salary_range_from = ""
    addItem.salary_range_to = ""
    addItem.salary_base = ""
    addItem.tax_amount = ""
    addItem.over_salary_base = ""
    addItem.id = 0
}
</script>

<template>
    <div>
        <h2 class="text-2xl font-semibold dark:text-white">
            Withholding Tax
        </h2>

        <div class="flex flex-row">
            <button type="button" class="mt-5 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
                $ BIR WTax Calculator
            </button>
        </div>

        <div class="mt-5 flex gap-7">
            <div class="w-2/5">
                <div class="edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
                    <div class="mb-6">
                        <label for="" class="text-xl font-semibold text-gray-900">WTAX Create</label>
                    </div>
                    <div class="mb-6">
                        <label for="term" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Term</label>
                        <select id="term" v-model="addItem.term" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
                                    v-model="addItem.salary_range_from"
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
                                    v-model="addItem.salary_range_to"
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
                            v-model="addItem.tax_amount"
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
                            v-model="addItem.over_salary_base"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                        >
                    </div>
                    <div class="flex flex-row gap-5">
                        <div>
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="submitAdd()">
                                Add
                            </button>
                        </div>
                        <div>
                            <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="clear()">
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-3/5">
                <div class="w-full">
                    <div id="accordion-color" class="w-full" data-accordion="collapse" data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
                        <h2 id="ac-heading-1">
                            <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#ac-1" aria-expanded="false" aria-controls="ac-1">
                                <span>WTAX Table (Daily)</span>
                                <svg
                                    data-accordion-icon
                                    class="w-3 h-3 rotate-180 shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div id="ac-1" class="w-full hidden" aria-labelledby="ac-1">
                            <HrmsSetupWtaxTable :tabledata="items_daily" :tableheaders="headers" />
                        </div>
                        <h2 id="accordion-color-heading-2">
                            <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-2" aria-expanded="false" aria-controls="accordion-color-body-2">
                                <span>WTAX Table (Weekly)</span>
                                <svg
                                    data-accordion-icon
                                    class="w-3 h-3 rotate-180 shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div id="accordion-color-body-2" class="w-full hidden" aria-labelledby="accordion-color-heading-2">
                            <HrmsSetupWtaxTable :tabledata="items_weekly" :tableheaders="headers" />
                        </div>
                        <h2 id="accordion-color-heading-3">
                            <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-3" aria-expanded="false" aria-controls="accordion-color-body-3">
                                <span>WTAX Table (Semi-monthly)</span>
                                <svg
                                    data-accordion-icon
                                    class="w-3 h-3 rotate-180 shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div id="accordion-color-body-3" class="w-full hidden" aria-labelledby="accordion-color-heading-3">
                            <HrmsSetupWtaxTable :tabledata="items_semi_monthly" :tableheaders="headers" />
                        </div>
                        <h2 id="accordion-color-heading-4">
                            <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-4" aria-expanded="false" aria-controls="accordion-color-body-4">
                                <span>WTAX Table (Monthly)</span>
                                <svg
                                    data-accordion-icon
                                    class="w-3 h-3 rotate-180 shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div id="accordion-color-body-4" class="w-full hidden" aria-labelledby="accordion-color-heading-4">
                            <HrmsSetupWtaxTable :tabledata="items_monthly" :tableheaders="headers" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
