<template>
  <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto" >
      <h5 class="text-xl font-extrabold dark:text-white">Leave Application Form</h5>
      <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
        <div class="mb-6">
          <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" id="employee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
        </div> 
        <div class="mb-6">
          <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
          <input type="text" id="department" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
        </div>
      </div>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div class="mb-6">
            <label for="position" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
            <input type="text" id="position" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
          </div> 
          <div class="mb-6">
            <label for="date_filed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Filed</label>
            <input type="date" id="date_filed" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
          </div> 
        </div>
        <div class="flex gap-7">
          <div class="w-3/5">
            <h5 class="text-xl font-extrabold dark:text-white">LEAVE AVAILMENT</h5>
            <div class="flex gap-5">
              <div class="w-1/2">
                <div class="mt-5 flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sick / Check up</label>
                </div>
                <div class="flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Special Celebration</label>
                </div>
                <div class="flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vacation</label>
                </div>
                <div class="flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mandatory Leave</label>
                </div>
                <div class="flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bereavement</label>
                </div>
                <div class="flex items-center mb-4">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Maternity / Paternity</label>
                </div>
                <div class="flex items-center mb-4">
                  <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
                </div>
                <div class="flex items-center mb-4">
                  <input type="text" id="other_absence_requested" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                </div>
                <div class="flex items-center mb-4">
                  <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
                    <div class="mb-6">
                      <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                      <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">WITH PAY</label>
                    </div> 
                    <div class="mb-6">
                      <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                      <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">WITHOUT PAY</label>
                    </div> 
                  </div> 
                </div>
                <div class="mb-6">
                  <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">REASONS/REMARKS</label>
                  <input type="text" id="other_absence_requested" class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                </div> 
              </div>
              <div class="w-1/2">
                <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
                  <div class="mb-6">
                    <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of Days:</label>
                    <input type="text" id="employee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                  </div> 
                  <div class="mb-6">
                    <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of Hours:</label>
                    <input type="text" id="department" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                  </div>
                </div>
                <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
                  <div class="mb-6">
                    <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of Days:</label>
                    <input type="date" id="employee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                  </div> 
                  <div class="mb-6">
                    <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. of Hours:</label>
                    <input type="date" id="department" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                  </div>
                </div>
                <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
                  <div class="mb-6">
                    <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time From:</label>
                    <input type="time" id="employee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                  </div> 
                  <div class="mb-6">
                    <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time To:</label>
                    <input type="time" id="department" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-2/5">
            <h5 class="text-xl font-extrabold dark:text-white">EMPLOYEE'S LEAVE RECORD (HRD use only)</h5>
              <EasyDataTable
                class="mt-5"
                :headers="headers"
                :items="items"
              >
              </EasyDataTable>
          </div>
        </div>
      <div class="max-w-full flex flex-row-reverse mt-5">
        <button @click="submitAdd" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
      </div>
    </div>
</template>


<script setup lang="ts">
import { Header, Item } from "vue3-easy-data-table";

const headers: Header[] = [
      { text: "CREDITS", value: "credits" },
      { text: "EARNED", value: "earned" },
      { text: "USED", value: "used" },
      { text: "BALANCE", value: "balance" },
];

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
]);

const AddItem = reactive({
range_compensation: "",
employer_share: "",
employee_share: "",
total_contributions: "",
id: 0,
});

const editingItem = reactive({
range_compensation: "",
employer_share: "",
employee_share: "",
total_contributions: "",
id: 0,
});

const deleteItem = (val: Item) => {
//   items.value.splice(val.id,1);      
};

const editItem = (val: Item) => {
const { range_compensation, employer_share, employee_share, total_contributions, id } = val;
editingItem.range_compensation = range_compensation;
editingItem.employer_share = employer_share;
editingItem.employee_share = employee_share;
editingItem.total_contributions = total_contributions;
editingItem.id = id;
};

const submitEdit = () => {
//   const item = items.value.find((item: { id: number; }) => item.id === editingItem.id);
//   item.range_compensation = editingItem.range_compensation;
//   item.employer_share = editingItem.employer_share;
//   item.employee_share = editingItem.employee_share;
//   item.total_contributions = editingItem.total_contributions;
};

const autoAdd = () =>{
AddItem.total_contributions = AddItem.employee_share + AddItem.employer_share;
}

const autoAddinEdit = () =>{
editingItem.total_contributions = editingItem.employee_share + editingItem.employer_share;
}

const submitAdd = () => {
};
</script>