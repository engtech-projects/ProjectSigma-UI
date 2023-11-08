<template>
  <form action="" v-for="(dependent, index) in dependents" :key="index">

      <div class="font-bold">
        CONTACT PERSON IN CASE OF EMERGENCY
      </div>

      <table class="w-full border-collapse border border-slate-400 table-fixed" >
        <tbody>
          <tr >
              <td class="border border-slate-300 p-1">
                <label for="small-input" class="block mb-2 text-xs w-32 font-bold text-gray-900 dark:text-white">Name</label>
                  <input type="text" id="contact_person_name" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </td>
              <td class="border border-slate-300 p-1 space-y-1">
                  <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Address</label>
                    <input type="date" id="contact_person_addr" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </td>
              
              <td class="border border-slate-300 p-1">
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Telephone No.</label>
                  <div class="flex justify-start items-center gap-1">
                    <input type="number" id="contact_person_telno" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
              </td>
              <td class="border border-slate-300 p-1">
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Mobile No.</label>
                  <div class="flex justify-start items-center gap-1">
                    <input type="text" id="contact_person_mobileno" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
              </td>
              
            </tr>
        </tbody>
      </table>
  </form>
</template>

<script>
export default {
data() {
  return {
    dependents: [{ name: '', dob: '', age: '', relationship: '', dependent: '' }],
    isChecked: false,
      label: 'No',
  };
},
methods: {
  addDependents() {
    this.dependents.push({ name: '', dob: '', age: '', relationship: '', dependent: '' });
  },
  deleteDependents(index) {
    this.dependents.splice(index, 1);
  },

  toggleLabel() {
      this.label = this.isChecked ? 'Yes' : 'No';
    },
},
};
</script>