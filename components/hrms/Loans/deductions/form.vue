<template>
    <div class="md:mt-0 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
        <label for="" class="text-xl font-semibold text-gray-900">Other Deductions Form</label>
        <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label for="employee_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deduction Name</label>
                <input id="employee_name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div>
                <label for="date_fill" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Filed</label>
                <input id="date_fill" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
        </div>
        <div class="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
                <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deduction Description</label>
                <input
                    id="department"
                    disabled
                    readonly
                    type="text"
                    class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                >
            </div>
            <div>
                <label for="date_fill" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deduction Start</label>
                <input id="date_fill" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <!-- <div>
        <label for="position" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
        <input disabled readonly type="text" id="position" class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
      </div> -->
        </div>
        <div class="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
                <label for="first_name" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Terms</label>
                <div class="md:flex gap-6 mt-4">
                    <div class="flex flex-wrap items-center mb-4 gap-3">
                        <input id="leave-availment-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="leave-availment-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Monthly</label>
                    </div>
                    <div class="flex flex-wrap items-center mb-4 gap-3">
                        <input id="leave-availment-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="leave-availment-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Semi-monthly</label>
                    </div>
                </div>
            </div>
            <div>
                <label for="position" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration (Months)</label>
                <input id="position" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
        </div>

        <!-- <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div class="mt-5">
          <label for="amt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount To Deduct</label>
          <input type="number" id="amt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="mt-5">
          <label for="amt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Loaned</label>
          <input type="number" id="amt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
    </div> -->

        <EasyDataTable
            id="overtime_form"
            class="mt-5"
            table-class-name="customize-table"
            :headers="headers"
            :items="items"
        >
            <template #item-name="item">
                <div v-for="(data, index) in AddItem" :key="index" class="flex flex-row gap-5">
                    <div class="flex-grow shrink-0">
                        <input
                            id="name"
                            v-model="data.name"
                            placeholder=""
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                    </div>
                </div>
            </template>
            <template #item-atd="item">
                <div v-for="(data, index) in AddItem" :key="index" class="flex flex-row gap-5">
                    <div class="flex-grow shrink-0">
                        <input
                            id="atd"
                            v-model="data.atd"
                            placeholder=""
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                    </div>
                </div>
            </template>
            <template #item-dpt="item">
                <div v-for="(data, index) in AddItem" :key="index" class="flex flex-row gap-5">
                    <div class="flex-grow shrink-0 flex flex-row gap-2">
                        <input
                            id="type"
                            v-model="data.dpt"
                            placeholder=""
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                    </div>
                </div>
            </template>
            <template #item-actions="item">
                <div v-for="(data, index) in AddItem" :key="index" class="flex flex-row gap-5">
                    <div class="flex flex-row justify-between gap-2">
                        <button
                            :id="&quot;add-employee-btn-&quot;+index"
                            :class="{'add-btn-not-active':data.addisnotActive}"
                            class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            @click="AddEmployeeItem(index)"
                        >
                            <Icon class="text-lg" name="ic:baseline-plus" />
                        </button>
                        <button
                            :id="&quot;remove-employee-btn-&quot;+index"
                            :class="{'remove-btn-not-active':data.removeisnotActive}"
                            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm w-full sm:w-auto px-2 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            @click="RemoveEmployeeItem(index)"
                        >
                            <Icon class="text-lg" name="ic:baseline-minus" />
                        </button>
                    </div>
                </div>
            </template>
        </EasyDataTable>

        <div class="max-w-full flex flex-row-reverse mt-5">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="submitAdd">
                <Icon name="ic:baseline-add" class="w-4 h-4 " fill="currentColor" /> Add
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

import { Header, Item } from "vue3-easy-data-table"
import { ref, reactive } from "vue"

const headers: Header[] = [
    {
        text: "Employee Name", value: "name",
    },
    {
        text: "Amount to deduct", value: "atd",
    },
    {
        text: "Deduction per term", value: "dpt",
    },
    {
        text: "", value: "actions",
    }
]

const items: Item[any] = ref([
    {

    }
])

const AddItem = ref([
    {
        name: "",
        atd: "",
        dpt: "",
        addisnotActive: false,
        removeisnotActive: true
    }
])

const deleteItem = (val: Item) => {
//   items.value.splice(val.id,1);
}

const submitEdit = () => {
    // const item = items.value.find((item: { id: number; }) => item.id === editingItem.id);
    // item.name = editingItem.name;
}

const AddEmployeeItem = (index:any) => {
    AddItem.value[index].addisnotActive = true
    AddItem.value[index].removeisnotActive = false
    AddItem.value.push(
        {
            name: "",
            atd: "",
            dpt: "",
            addisnotActive: false,
            removeisnotActive: true
        }
    )
    console.log(AddItem.value)
    // isActive.value = !isActive.value;
}
const RemoveEmployeeItem = (index:any) => {
    AddItem.value.splice(index, 1)
}

const submitAdd = () => {
}
</script>

<style>
.customize-table {
  --easy-table-body-row-hover-font-color:none !important;
  --easy-table-body-row-hover-background-color:none !important;
}
#overtime_form .vue3-easy-data-table__footer{
  display: none !important;
}

.add-btn-not-active, .remove-btn-not-active{
  display: none;
}
</style>
