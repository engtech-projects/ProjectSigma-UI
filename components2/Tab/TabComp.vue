<template>
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul id="default-tab" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#default-tab-content" role="tablist">
            <li class="mr-2" role="presentation">
                <button
                    id="pis-tab"
                    class="inline-block p-4 border-b-2 rounded-t-lg"
                    data-tabs-target="#pis"
                    type="button"
                    role="tab"
                    aria-controls="pis"
                    aria-selected="false"
                >
                    PIS
                </button>
            </li>
            <li class="mr-2" role="presentation">
                <button
                    id="staff-tab"
                    class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    data-tabs-target="#staff"
                    type="button"
                    role="tab"
                    aria-controls="staff"
                    aria-selected="false"
                >
                    Staff Information Sheet
                </button>
            </li>
            <li class="mr-2" role="presentation">
                <button
                    id="docsmemo-tab"
                    class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    data-tabs-target="#docsmemo"
                    type="button"
                    role="tab"
                    aria-controls="docsmemo"
                    aria-selected="false"
                >
                    Documents & Memos
                </button>
            </li>
            <!-- <li class="mr-2" role="presentation">
                <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="memo-tab" data-tabs-target="#memo" type="button" role="tab" aria-controls="memo" aria-selected="false">Memos</button>
            </li> -->
        </ul>
    </div>

    <div id="default-tab-content">
        <div id="pis" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="pis-tab">
            <EvenparNologo />
            <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">Employee Information</label>
            <EmployeeInfo />
            <label for="employeeeduc" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">Education</label>
            <EmployeeEducation />
            <label for="employee_employment" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">Employment</label>
            <EmployeeEmployment />
        </div>

        <div id="staff" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="staff-tab">
            <Employee201StaffInfoSheet />
        </div>

        <div id="docsmemo" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="docsmemo-tab">
            <div class="flex gap-4">
                <EmployeeDocs />
                <EmployeeMemo />
            </div>
        </div>
    </div>
</template>
