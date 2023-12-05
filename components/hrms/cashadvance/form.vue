<template>
  <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto" >
    <h5 class="text-xl font-extrabold dark:text-white">Cash Advance Request Form</h5>
    <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
          <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
        </div>
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Name</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
        </div>
    </div>
    <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Name</label>
          <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
        </div>
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Name</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
        </div>
    </div>
    <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
          <input type="date" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
        </div>
        <div>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time From</label>
              <input type="time" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
            </div>
            <div>
              <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To</label>
              <input type="time" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
            </div>
          </div>
        </div>
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total # Of Hrs.</label>
          <input type="time" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
        </div>
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Purpose/Reason</label>
          <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
        </div>
        
    </div>
    <div class="max-w-full flex flex-row-reverse mt-5">
      <button @click="submitAdd" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { Header, Item } from "vue3-easy-data-table";
import { ref, reactive } from "vue";

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