<template>
  <form action="" v-for="(dependent, index) in dependents" :key="index">

      <div class="font-bold">
        DEPENDENTS
      </div>

      <table class="w-full border-collapse border border-slate-400 table-fixed" >
        <tbody>
          <tr >
              <td colspan=2 class="border border-slate-300 p-1">
                <label for="small-input" class="block mb-2 text-xs w-32 font-bold text-gray-900 dark:text-white">Name of Dependents</label>
                  <input type="text" v-model="dependent.name" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </td>
              <td class="border border-slate-300 p-1 space-y-1">
                  <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Date of Birth</label>
                    <input type="date" v-model="dependent.dob" id="superior_name" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </td>
              
              <td class="border border-slate-300 p-1">
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Age</label>
                  <div class="flex justify-start items-center gap-1">
                    <input type="number" v-model="dependent.age" id="superior_name" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
              </td>
              <td class="border border-slate-300 p-1">
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Relationship</label>
                  <div class="flex justify-start items-center gap-1">
                    <input type="text" v-model="dependent.relationship" id="superior_name" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
              </td>
              <td class="border border-slate-300 p-1 w-24">
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Dependent</label>
                <div class="flex">

                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="dependent.dependent" value="" class="sr-only peer">
                    <div class="w-11 h-6 bg-red-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                
                  <button class="delete-button" @click.prevent="deleteDependents(index)" v-if="index > 0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button class="add-button" @click="addDependents" v-if="index === dependents.length - 1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600 ">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button class="add-button" @click="addDependents" v-if="index === dependents.length - 1">
                  </button>
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
  };
},
methods: {
  addDependents() {
    this.dependents.push({ name: '', dob: '', age: '', relationship: '', dependent: '' });
  },
  deleteDependents(index) {
    this.dependents.splice(index, 1);
  },

  
},
};
</script>