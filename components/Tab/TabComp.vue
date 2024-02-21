<template>
    <div class="flex md:flex-row flex-col">
        <div class="w-full md:w-1/3">
            <Employee201EmployeeInformationSheet />
        </div>
        <div class="w-full md:w-2/3 overflow-scroll">
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
                <div id="pis" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="staff-tab">
                    <EvenparNologo />
                    <EmployeeInfo />
                    <EmployeeEducation />
                    <EmployeesSpouse />
                    <EmployeesDependents />
                    <EmployeesContactPerson />
                    <EmployeesCompInfo />
                    <EmployeesCareer />
                    <div class="mt-8 flex justify-end">
                        <div>
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Save
                            </button>

                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onclick="window.print()">
                                Print this page
                            </button>
                        </div>
                    </div>
                </div>
                <div id="staff" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="staff-tab">
                    <EvenparNologo />
                    <EmployeesCompInfo />
                    <EmployeesCareer />
                    <div class="mt-8 flex justify-end">
                        <div>
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Save
                            </button>

                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onclick="window.print()">
                                Print this page
                            </button>
                        </div>
                    </div>
                </div>

                <div id="docsmemo" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="docsmemo-tab">
                    <div class="flex gap-4">
                        <EmployeeDocs />
                        <EmployeeMemo />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
