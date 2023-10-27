<template>
  <form action="" v-for="(emprecord, index) in emprecords" :key="index">
    <div class="flex items-center justify-end">
        <button class="delete-button" @click.prevent="deleteEmprecords(index)" v-if="index > 0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button class="add-button" @click="addEmprecords" v-if="index === emprecords.length - 1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button class="add-button" @click="addEmprecords" v-if="index === emprecords.length - 1">
          <span class="text-green-500 hover:text-green-700">Add Membership Record</span>
        </button>
      </div>

      <table class="w-full border-collapse border border-slate-400 table-fixed" >
        <tbody>
          <tr >
              <td class="border border-slate-300 p-1">
                <label for="small-input" class="block mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">ORGANIZATION/CLUB</label>
                  <input type="text" v-model="emprecord.incdates" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </td>
              <td class="border border-slate-300 p-1">
                <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">POSITION</label>
                  <div class="justify-center items-center gap-2">
                    <input type="text" v-model="emprecord.posdept" id="superior_name" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
              </td>
              <td class="border border-slate-300 p-1">
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">INCLUSIVE DATE OF MEMBERSHIP</label>
                <div class="flex-wrap">
                    <input type="date" v-model="emprecord.supcont" id="inclusive_date"  class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
    emprecords: [{ compname: '', imdtsuperior: '', from: '', salarystart: '', compaddr: '', compcont: '', to: '', salaryfinal: '', duties: '' }],
  };
},
methods: {
  addEmprecords() {
    this.emprecords.push({ compname: '', imdtsuperior: '', from: '', salarystart: '', compaddr: '', compcont: '', to: '', salaryfinal: '', duties: '' });
  },
  deleteEmprecords(index) {
    this.emprecords.splice(index, 1);
  },
},
};
</script>