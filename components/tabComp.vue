<template>
  <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <ul
      class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
      id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
      <li class="mr-2">
        <button id="pis-tab" data-tabs-target="#pis" type="button" role="tab" aria-controls="pis"
          aria-selected="true"
          class="inline-block p-4 text-blue-600 rounded-tl-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">PIS</button>
      </li>
      <li class="mr-2">
        <button id="staff-tab" data-tabs-target="#staff" type="button" role="tab" aria-controls="staff"
          aria-selected="false"
          class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Staff Information Sheet</button>
      </li>

      
    </ul>
    <div id="defaultTabContent">
      <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="about" role="tabpanel"
        aria-labelledby="about-tab">
        <h2 class="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">News</h2>
        <p class="mb-3 text-gray-500 dark:text-gray-400">Empower Developers, IT Ops, and business teams to collaborate at
          high velocity. Respond to changes and deliver great customer and employee service experiences fast.</p>

        <h2 class="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Upcoming Activities</h2>
        <p class="mb-3 text-gray-500 dark:text-gray-400">Empower Developers, IT Ops, and business teams to collaborate at
          high velocity. Respond to changes and deliver great customer and employee service experiences fast.</p>
        <a href="#"
          class="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
          Learn more
          <svg class="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
        </a>
      </div>
      <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="services" role="tabpanel"
        aria-labelledby="services-tab">

        <EvenparNologo />

        <div class="flex p-2 mt-6">
          <div class="text-lg lg:text-2xl font-normal text-left mb-4 col-span-2">STAFF INFORMATION SHEET</div>
        </div>

        <div class="flex justify-center">
          <span class="text-xs font-nomal italic">This sheet is for employee's records & updates purposes. Kindly fill-in all inforamtion needed and just put N/A to any field that is already irrelevant to you. Immediately submit to HRD after completion.</span>
        </div>

        <div>
          <EmployeesCompInfo />
        </div>

      </div>
    </div>
  </div>
</template>