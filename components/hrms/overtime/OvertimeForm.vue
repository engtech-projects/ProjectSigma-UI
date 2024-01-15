<template>
    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
        <label for="" class="text-xl font-semibold text-gray-900">Overtime Authorization Form</label>

        <!-- <div class="mt-5 grid grid-cols-1">
        <div>
          <label for="project_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
          <input type="text" id="project_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
    </div> -->
        <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-4">
            <div>
                <label for="date_overtime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Overtime</label>
                <input id="date_overtime" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
            </div>
            <div>
                <label for="time_from" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time From</label>
                <input id="time_from" type="time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
            </div>
            <div>
                <label for="time_to" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To</label>
                <input id="time_to" type="time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
            </div>
            <div>
                <label for="total_hrs" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total # Of Hrs.</label>
                <input id="total_hrs" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
        </div>
        <div class="mt-5 ">
            <label for="purpose" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Purpose/Reason</label>
            <input id="purpose" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div class="mt-5 grid grid-cols-1">
            <div>
                <label for="project_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Selection</label>
                <select id="project_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option value="1">
                        Project 1
                    </option>
                    <option value="2">
                        Project 2
                    </option>
                    <option value="3">
                        Project 3
                    </option>
                    <option value="4">
                        Project 4
                    </option>
                </select>
            </div>
        </div>

        <EasyDataTable
            v-model:items-selected="itemsSelected"
            class="mt-5"
            :headers="headers"
            :items="items"
        />

        <div class="max-w-full flex flex-row-reverse mt-5">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="submitAdd">
                Add
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Header, Item } from "vue3-easy-data-table"

const itemsSelected = ref<Item[]>([])

const headers: Header[] = [
    {
        text: "Employee Name", value: "name",
    },
]

const submitAdd = () => {

}

const items: Item[any] = ref([
    {
        name: "Jose Sheeran",
    },
    {
        name: "John Lee",
    },
    {
        name: "Clark Evans",
    },
    {
        name: "Jones Mason",
    },
])

// <EasyDataTable
//       id="overtime_form"
//       class="mt-5"
//       table-class-name="customize-table"
//       :headers="headers"
//       :items="items">
//             <template #item-name="item" >
//               <div v-for="(data, index) in AddItem" :key="index" class="flex flex-row gap-1">
//                 <input v-model="data.name" placeholder="Select Employee" type="text" id="employee_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
//                 <div class="flex flex-row justify-between gap-2">
//                   <button
//                     @click="AddEmployeeItem(index)"
//                     :id='"add-employee-btn-"+index'
//                     :class="{'add-btn-not-active':data.addisnotActive}"
//                     class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                     >
//                     <Icon class="text-lg" name="ic:baseline-plus" />
//                   </button>
//                   <button
//                     @click="RemoveEmployeeItem(index)"
//                     :id='"remove-employee-btn-"+index'
//                     :class="{'remove-btn-not-active':data.removeisnotActive}"
//                     class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm w-full sm:w-auto px-2 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
//                   >
//                   <Icon class="text-lg" name="ic:baseline-minus" />
//                   </button>
//                 </div>
//               </div>
//             </template>
//     </EasyDataTable>

// const AddItem = ref([
//   {
//     name: "",
//     addisnotActive: false,
//     removeisnotActive: true
//   }
// ])

// const deleteItem = (val: Item) => {
// //   items.value.splice(val.id,1);
// }

// const submitEdit = () => {
//   // const item = items.value.find((item: { id: number; }) => item.id === editingItem.id);
//   // item.name = editingItem.name;
// }

// const AddEmployeeItem = (index:any)=> {

//   AddItem.value[index].addisnotActive=true
//   AddItem.value[index].removeisnotActive=false
//   AddItem.value.push(
//     {
//       name:"",
//       addisnotActive: false,
//       removeisnotActive: true
//     }
//   )
//   console.log(AddItem.value);
//   // isActive.value = !isActive.value;
// }
// const RemoveEmployeeItem = (index:any) => {
//   AddItem.value.splice(index, 1);
// }
</script>

<style>

#overtime_form .vue3-easy-data-table__footer{
  display: none !important;
}

.add-btn-not-active, .remove-btn-not-active{
  display: none;
}
</style>
