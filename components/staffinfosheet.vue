<template>
    <EvenparNologo />

    <div class="flex p-2 mt-6">
      <div class="text-lg lg:text-2xl font-normal text-left mb-4 col-span-2">STAFF INFORMATION SHEET</div>
    </div>

    <div class="flex justify-center">
      <span class="text-xs font-nomal italic">This sheet is for employee's records & updates purposes. Kindly fill-in all inforamtion needed and just put N/A to any field that is already irrelevant to you. Immediately submit to HRD after completion.</span>
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
  </template>