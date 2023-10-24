<template>
  <div>
    <!-- Section 1: Children's Information -->
    <table>
      <tbody>
        <tr v-for="(child, index) in children" :key="index">
          <td colspan="2" class="border border-slate-300 p-1">
            <div>
              <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME OF CHILDREN</label>
              <input type="text" v-model="child.name" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
          </td>
          <td colspan="2" class="border border-slate-300 p-1">
            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE OF BIRTH</label>
            <div class="flex">
              <input type="date" v-model="child.dob" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <button class="delete-button" @click="deleteChild(index)" v-if="index > 0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
              <button class="add-button " @click="addChild" v-if="index === children.length - 1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600 "><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
            </div>
            <td></td>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Section 2: Relatives' Information -->
    <table>
      <tbody>
        <tr v-for="(relative, index) in relatives" :key="index">
          <td class="border border-slate-300 p-1">
            <label for="small-input" class="block mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">DO YOU HAVE RELATIVES OR FAMILY MEMBERS WORKING FOR ACLC?</label>
          </td>
          <td class="border border-slate-300 p-1">
            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME</label>
            <div class="flex">
              <input type="text" v-model="relative.relative_name" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
          </td>
          <td class="border border-slate-300 p-1">
            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">RELATIONSHIP</label>
            <div class="flex">
              <input type="text" v-model="relative.relative_rel" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
          </td>
          <td class="border border-slate-300 p-1">
            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">POSITION & DEPARTMENT</label>
            <div class="flex">
              <input type="date" v-model="relative.relative_position" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <button class="delete-button" @click="deleteRelative(index)" v-if="index > 0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-600"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
              <button class="add-button " @click="addRelative" v-if="index === relatives.length - 1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600 "><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      children: [{ name: '', dob: '' }],
      relatives: [{ relative_name: '', relative_rel: '', relative_position: '' }],
    };
  },
  methods: {
    addChild() {
      this.children.push({ name: '', dob: '' });
    },
    addRelative() {
      this.relatives.push({ relative_name: '', relative_rel: '', relative_position: '' });
    },
    deleteChild(index) {
      this.children.splice(index, 1);
    },
    deleteRelative(index) {
      this.relatives.splice(index, 1);
    },
  },
};
</script>
