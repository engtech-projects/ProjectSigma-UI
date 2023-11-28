<script  setup lang="ts">

import { Header, Item } from "vue3-easy-data-table";
import { defineComponent, ref, reactive } from "vue";

const headers: Header[] = [
      { text: "Range of Compensation", value: "status" },
      { text: "Emlpoyer Share", value: "compensation_range" },
      { text: "Employee Share", value: "salary_base" },
      { text: "Total Contributions", value: "tax_amount" },
      { text: "Total Contributions", value: "over_salary_base" },
      { text: "Actions", value: "actions" },
];

const main_items =[
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

const items_daily: Item[any] = ref(main_items[0]);
const items_weekly: Item[any] = ref(main_items[1]);
const items_semi_monthly: Item[any] = ref(main_items[2]);
const items_monthly: Item[any] = ref(main_items[3]);

const editingItem = reactive({
  id: 0,
});

const deleteItem = (val: Item) => {
};

const editItem = (val: Item) => {
  const { range_compensation, employer_share, employee_share, total_contributions, id } = val;
  editingItem.id = id;
};

const submitEdit = () => {
  // const item = items.value.find((item: { id: number; }) => item.id === editingItem.id);
  // item.total_contributions = editingItem.total_contributions;
};
</script>

<template>
  
  <h2 class="mt-5 text-4xl font-extrabold dark:text-white">Withholding Tax</h2>
  
  <button type="button" class="mt-5 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">$ BIR WTax Calculator</button>

  <div class="mt-7 flex w-full">
    <div class="w-full" id="accordion-color" data-accordion="collapse" data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white">
      <h2 id="accordion-color-heading-1">
        <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-1" aria-expanded="false" aria-controls="accordion-color-body-1">
          <span>WTAX Table (Daily)</span>
          <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
          </svg>
        </button>
      </h2>
      <div id="accordion-color-body-1" class="w-full hidden" aria-labelledby="accordion-color-heading-1">
        <EasyDataTable
          show-index
          :headers="headers"
          :items="items_daily"
          class="p-10"
        >
        </EasyDataTable>
      </div>
      <h2 id="accordion-color-heading-2">
        <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-2" aria-expanded="false" aria-controls="accordion-color-body-2">
          <span>WTAX Table (Weekly)</span>
          <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
          </svg>
        </button>
      </h2>
      <div id="accordion-color-body-2" class="w-full hidden" aria-labelledby="accordion-color-heading-2">
        <EasyDataTable
          show-index
          :headers="headers"
          :items="items_weekly"
          class="p-10"
        >
        </EasyDataTable>
      </div>
      <h2 id="accordion-color-heading-3">
        <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-3" aria-expanded="false" aria-controls="accordion-color-body-3">
          <span>WTAX Table (Semi-monthly)</span>
          <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
          </svg>
        </button>
      </h2>
      <div id="accordion-color-body-3" class="w-full hidden" aria-labelledby="accordion-color-heading-3">
        <EasyDataTable
          show-index
          :headers="headers"
          :items="items_weekly"
          class="p-10"
        >
        </EasyDataTable>
      </div>
      <h2 id="accordion-color-heading-4">
        <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-color-body-4" aria-expanded="false" aria-controls="accordion-color-body-4">
            <span>WTAX Table (Monthly)</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
          </svg>
        </button>
      </h2>
      <div id="accordion-color-body-4" class="w-full hidden" aria-labelledby="accordion-color-heading-4">
        <EasyDataTable
          show-index
          :headers="headers"
          :items="items_weekly"
          class="p-10"
        >
        </EasyDataTable>
      </div>
    </div>
  </div>
</template>
