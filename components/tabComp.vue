<template>
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
            <li class="mr-2" role="presentation">
                <button class="inline-block p-4 border-b-2 rounded-t-lg" id="pis-tab" data-tabs-target="#pis" type="button" role="tab" aria-controls="pis" aria-selected="false">PIS</button>
            </li>
            <li class="mr-2" role="presentation">
                <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="staff-tab" data-tabs-target="#staff" type="button" role="tab" aria-controls="staff" aria-selected="false">Staff Information Sheet</button>
            </li>
            <li class="mr-2" role="presentation">
                <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="docsmemo-tab" data-tabs-target="#docsmemo" type="button" role="tab" aria-controls="docsmemo" aria-selected="false">Documents & Memos</button>
            </li>
            <!-- <li class="mr-2" role="presentation">
                <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="memo-tab" data-tabs-target="#memo" type="button" role="tab" aria-controls="memo" aria-selected="false">Memos</button>
            </li> -->
        </ul>
    </div>

    <div id="default-tab-content">
        <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="pis" role="tabpanel" aria-labelledby="pis-tab">
            <EvenparNologo />
            <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">Employee Information</label>
                <EmployeeInfo />
            <label for="employeeeduc" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">Education</label>
                <EmployeeEducation />
            <label for="employee_employment" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">Employment</label>
                <EmployeeEmployment />
        </div>

        <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="staff" role="tabpanel" aria-labelledby="staff-tab">
            <StaffinfoSheet >
                <div>
                    <EvenparNologo />
        
                    <div class="flex p-2 mt-6">
                        <div class="text-lg lg:text-2xl font-normal text-left mb-4 col-span-2">STAFF INFORMATION SHEET</div>
                    </div>
        
                    <div class="flex justify-center">
                        <span class="text-xs font-nomal italic">This sheet is for employee's records & updates purposes. Kindly fill-in all information needed and just put N/A to any field that is already irrelevant to you. Immediately submit to HRD after completion.</span>
                    </div>
        
                    <div class="mt-8">
                        <EmployeesCompInfo />
                    </div>
        
                    <div class="mt-8">
                        <EmployeesPersonalInfo />
                    </div>
        
                    <div class="mt-8">
                        <EmployeesSpouse />
                    </div>
        
                    <div class="mt-8">
                        <EmployeesDependents />
                    </div>
        
                    <div class="mt-8">
                        <EmployeesEducBackground/>
                    </div>
        
                    <div class="mt-8">
                        <EmployeesCareer/>
                    </div>
        
                    <div class="mt-8">
                        <EmployeesContactPerson />
                    </div>
        
                    <div class="mt-8 flex justify-end">
                    <div>
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save</button>
                        
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onclick="window.print()">Print this page</button>
                    </div>
                    </div>
                </div>
            </StaffinfoSheet>
        </div>

        <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="docsmemo" role="tabpanel" aria-labelledby="docsmemo-tab">
            <div class="flex gap-4">
                <EmployeeDocs />
                <EmployeeMemo />
            </div>
        </div>
    </div>
</template>