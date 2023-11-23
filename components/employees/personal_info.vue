<template>
  <form action="">
      <table class="w-full border-collapse border border-slate-400 table-fixed items-center">
        <div class="font-bold">
          PERSONAL INFORMATION
        </div>

        <tbody>
          <tr>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Employee ID</label>
                <input type="text"  id="master_title" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Family Name</label>
                <input type="text" id="small-input" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">First Name</label>
                <input type="text" id="small-input" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Middle Name</label>
                <input type="text" id="small-input" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Blood Type</label>
                <input type="text" id="small-input" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Civil Status</label>
                <input type="text" id="small-input" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Date of Birth</label>
                <input type="date"  id="master_title" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Gender</label>
                  <select id="bloodtype" name="bloodtype" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      
                  </select>
              </div>
            </td>
          </tr>

          <tr>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Father's Name</label>
                <input type="text"  id="master_title" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white truncate">Mother's Maiden Name</label>
                <input type="text"  id="master_title" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Telephone No.</label>
                <input type="text"  id="master_title" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
              </div>
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Mobile No.</label>
                <input type="text"  id="master_title" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
              </div>
            </td>
            <td class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Religion</label>
                <input type="text"  id="master_title" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
              </div>
            </td>
          </tr>
          
          <tr>
            <td colspan=4 class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Current Address</label>
                <input type="text"  id="master_title" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
              </div>
            </td>
          </tr>
          <tr>
            <td colspan=4 class="border border-slate-300 p-1">
              <div>
                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Permanent Address</label>
                <input type="text"  id="master_title" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
              </div>
            </td>
          </tr>

        </tbody>
      </table>
  </form>
</template>

