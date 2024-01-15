<template>
    <h5 class="text-xl font-extrabold dark:text-white">
        Payroll Record Query
    </h5>
    <div class="mt-5 mb-6">
        <div class="search">
            <div class="mt-5 mb-5 grid grid-cols-1 gap-6 sm:grid-cols-5">
                <div>
                    <label for="department_category" class="block mb-2 text-[15px] font-medium text-gray-900 dark:text-white">DEPARTMENT CATEGORY</label>
                    <select id="department_category" name="department_category" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="selected" selected>
                            --SELECT--
                        </option>
                        <option value="Admin">
                            Admin
                        </option>
                        <option value="Faculty">
                            Faculty
                        </option>
                        <option value="Engtech">
                            Engtech
                        </option>
                        <option value="2">
                            2
                        </option>
                        <option value="1">
                            1
                        </option>
                        <option value="16">
                            16
                        </option>
                    </select>
                </div>
                <div>
                    <label for="employement_type" class="block mb-2 text-[15px] font-medium text-gray-900 dark:text-white">EMPLOYMENT TYPE</label>
                    <select id="employement_type" name="employement_type" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="selected" selected>
                            --SELECT--
                        </option>
                        <option value="contractual">
                            Contractual
                        </option>
                        <option value="parttime">
                            Part-time
                        </option>
                        <option value="probationary">
                            Probationary
                        </option>
                        <option value="project_based">
                            Project based
                        </option>
                        <option value="regular">
                            Regular
                        </option>
                    </select>
                </div>
                <div>
                    <label for="month" class="block mb-2 text-[15px] font-medium text-gray-900 dark:text-white">SELECT MONTH</label>
                    <select id="month" name="month" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="selected" selected>
                            --SELECT--
                        </option>
                        <option value="january">
                            January
                        </option>
                        <option value="february">
                            February
                        </option>
                        <option value="march">
                            March
                        </option>
                        <option value="april">
                            April
                        </option>
                        <option value="may">
                            May
                        </option>
                        <option value="june">
                            June
                        </option>
                        <option value="july">
                            July
                        </option>
                        <option value="august">
                            August
                        </option>
                        <option value="september">
                            September
                        </option>
                        <option value="october">
                            October
                        </option>
                        <option value="november">
                            November
                        </option>
                        <option value="december">
                            December
                        </option>
                    </select>
                </div>
                <div>
                    <label for="payroll_date" class="block mb-2 text-[15px] font-medium text-gray-900 dark:text-white">PAYROLL DATE</label>
                    <select id="payroll_date" name="payroll_date" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="selected" selected>
                            --SELECT--
                        </option>
                        <option value="15th">
                            15th
                        </option>
                        <option value="monthend">
                            Month end
                        </option>
                    </select>
                </div>
                <div>
                    <label for="payroll_year" class="block mb-2 text-[15px] font-medium text-gray-900 dark:text-white">PAYROLL YEAR</label>
                    <select id="payroll_year" name="payroll_year" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="selected" selected>
                            --SELECT--
                        </option>
                        <option value="2024">
                            2024
                        </option>
                        <option value="2023">
                            2023
                        </option>
                        <option value="2022">
                            2022
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="headline">
            <div class="mt-20 mb-5 flex max-w-full justify-center items-center flex-col gap-2">
                <h2 class="text-2xl ">
                    EVENPAR CONSTRUCTION DEVELOPMENT CORPORATION
                </h2>
                <span>Payroll</span>
            </div>
        </div>
        <div class="mb-3 head-table flex flex-row justify-start gap-14">
            <div class="project">
                Project 23N00016-EPJVEC
            </div>
            <div class="period_covered">
                Period Covered: OCT 12-18, 2023
            </div>
        </div>
        <div class="table">
            <table class="border">
                <thead>
                    <tr>
                        <th rowspan="2">
                            No
                        </th>
                        <th colspan="1">
                            Name
                        </th>
                        <th rowspan="2">
                            Designation
                        </th>
                        <th rowspan="2">
                            Rate
                        </th>
                        <th colspan="7">
                            No. of Days/Hours
                        </th>
                        <th colspan="7">
                            Gross Pay
                        </th>
                        <th rowspan="2">
                            Gross Pay
                        </th>
                        <th colspan="3">
                            Salary Deduction
                        </th>
                        <th rowspan="2">
                            Total Deduction
                        </th>
                        <th rowspan="2">
                            Total Net Pay
                        </th>
                    </tr>
                    <tr>
                        <th>Last Name, First Name</th>
                        <th>Reg. Day(s)</th>
                        <th>Rest Day/Sun</th>
                        <th>Reg. Hol.</th>
                        <th>Reg. Hol. O.T.</th>
                        <th>Spcl. Hol.</th>
                        <th>Reg O.T.</th>
                        <th>Rest Day O.T.</th>
                        <th>Reg.</th>
                        <th>Rest Day/Sun</th>
                        <th>Reg. Hol.</th>
                        <th>Reg. Hol. O.T.</th>
                        <th>Spcl. Hol.</th>
                        <th>Reg. O.T.</th>
                        <th>Rest Day O.T.</th>
                        <th>SSS</th>
                        <th>PHIC</th>
                        <th>HMDF</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            LOREM 1
                        </td>
                        <td>
                            LABORER
                        </td>
                        <td>
                            350
                        </td>
                        <td>
                            6
                        </td>
                        <td>
                            8
                        </td>
                        <td />
                        <td />
                        <td />
                        <td>
                            18
                        </td>
                        <td />
                        <td>
                            2,100.00
                        </td>
                        <td>
                            455.00
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            984.38
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            3,539.38
                        </td>
                        <td />
                        <td />
                        <td />
                        <td>
                            0.00
                        </td>
                        <td>
                            3,539.38
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2
                        </td>
                        <td>
                            LOREM 2
                        </td>
                        <td>
                            LABORER
                        </td>
                        <td>
                            350
                        </td>
                        <td>
                            6
                        </td>
                        <td>
                            8
                        </td>
                        <td />
                        <td />
                        <td />
                        <td>
                            18
                        </td>
                        <td />
                        <td>
                            2,100.00
                        </td>
                        <td>
                            455.00
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            984.38
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            3,539.38
                        </td>
                        <td />
                        <td />
                        <td />
                        <td>
                            0.00
                        </td>
                        <td>
                            3,539.38
                        </td>
                    </tr>
                    <tr>
                        <td>
                            3
                        </td>
                        <td>
                            LOREM 3
                        </td>
                        <td>
                            LABORER
                        </td>
                        <td>
                            350
                        </td>
                        <td>
                            6
                        </td>
                        <td>
                            8
                        </td>
                        <td />
                        <td />
                        <td />
                        <td>
                            18
                        </td>
                        <td />
                        <td>
                            2,100.00
                        </td>
                        <td>
                            455.00
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            984.38
                        </td>
                        <td>
                            0.00
                        </td>
                        <td>
                            3,539.38
                        </td>
                        <td />
                        <td />
                        <td />
                        <td>
                            0.00
                        </td>
                        <td>
                            3,539.38
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
table,th,td{
  border: 1px solid #000;
}
th,td{
  padding: 0.2rem;
}
.customize-table {
  --easy-table-header-item-padding: 10px 15px;
}
</style>
