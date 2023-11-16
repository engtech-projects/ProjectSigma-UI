<script setup>
defineProps({
  tblHeaders: {
    type: Array,
    required: true,
  },
  tblItems: {
    type: Array,
    required: true,
  },
});
const searchField = ref();
const searchValue = ref();
const showRow = (item) => {
  // data of row here
};
</script>

<template>
    <div class="w-full md:flex mb-2 mt-5 gap-4 justify-center">
        <div class="relative z-0 mb-6 w-full group">
            <select
            v-model="searchField"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
            >
            <option v-for="item in tblHeaders" :key="item.value">
                {{ item.value }}
            </option>
        </select>
      <label
        class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
        >Fields</label
      >
    </div>
    <div class="relative z-0 mb-6 w-full group">
      <input
        v-model="searchValue"
        type="text"
        name="floating_searValue"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
        placeholder=" "
        required
      />
      <label
        for="floating_searValue"
        class="absolute text-sm text-gray-950 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-bold"
        >Search</label
      >
    </div>
  </div>

  <EasyDataTable
    buttons-pagination
    :headers="tblHeaders"
    :items="tblItems"
    :theme-color="'#191d24'"
    :search-field="searchField"
    :search-value="searchValue"
    @click-row="showRow"
  >
  <template #loading>
      <p>Loading...</p>
    </template>

    <template #empty-message>
      <p>No Results Found</p>
    </template>
  </EasyDataTable>
</template>
