<template>

  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center" for="file_input">Upload CSV or Excel file</label>
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Allowed file types: CSV, Excel (XLS, XLSX).</p>

    <!-- Align button to the right -->
    <div class="flex justify-end">
      <button type="submit" class="w-38 h-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
        <Icon name="ic:baseline-send" color="white" class="w-5 h-5"/>
        Submit
      </button>
    </div>
  </div>
</template>