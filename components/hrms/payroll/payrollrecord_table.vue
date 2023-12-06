<template>
      <h5 class="text-xl font-extrabold dark:text-white">Payroll Record Query</h5>
        <div class="mt-5 mb-6">
          <div class="search">
              <div class="mt-5 mb-5 grid grid-cols-1 gap-6 sm:grid-cols-5">
                <div>
                  <label for="department_category" class="block mb-2 text-[15px] font-medium text-gray-900 dark:text-white">DEPARTMENT CATEGORY</label>
                  <select id="department_category" name="department_category" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="selected" selected>--SELECT--</option>
                        <option value="Admin">Admin</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Engtech">Engtech</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                        <option value="16">16</option>
                  </select>
                </div>
                <div>
                  <label for="employement_type" class="block mb-2 text-[15px] font-medium text-gray-900 dark:text-white">EMPLOYMENT TYPE</label>
                  <select id="employement_type" name="employement_type" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="selected" selected>--SELECT--</option>
                        <option value="contractual">Contractual</option>
                        <option value="parttime">Part-time</option>
                        <option value="probationary">Probationary</option>
                        <option value="project_based">Project based</option>
                        <option value="regular">Regular</option>
                  </select>
                </div>
                <div>
                  <label for="month" class="block mb-2 text-[15px] font-medium text-gray-900 dark:text-white">SELECT MONTH</label>
                  <select id="month" name="month" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="selected" selected>--SELECT--</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                  </select>
                </div>
                <div>
                  <label for="payroll_date" class="block mb-2 text-[15px] font-medium text-gray-900 dark:text-white">PAYROLL DATE</label>
                  <select id="payroll_date" name="payroll_date" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="selected" selected>--SELECT--</option>
                        <option value="15th">15th</option>
                        <option value="monthend">Month end</option>
                  </select>
                </div>
                <div>
                  <label for="payroll_year" class="block mb-2 text-[15px] font-medium text-gray-900 dark:text-white">PAYROLL YEAR</label>
                  <select id="payroll_year" name="payroll_year" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="selected" selected>--SELECT--</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                  </select>
                </div>
              </div>
          </div>
          <div class="table">
            <table>
              <th></th>
            </table>
          </div>
        </div>
  </template>
  
  
  <script setup lang="ts">
  
  </script>
  
  <style>
  .customize-table {
    --easy-table-header-item-padding: 10px 15px;
  }
  </style>