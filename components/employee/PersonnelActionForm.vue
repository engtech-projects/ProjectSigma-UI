<template>
  <div
    class="shadow-md p-4 mt-6 bg-white mb-3 border border-gray-200 rounded-lg w-full md:w-1/2">
    <div class="flex items-center md:justify-center p-4">
      <div class="text-2xl p-3 lg:text-4xl text-right">
        <h1 class="font-bold text-sm text-green-500">
          EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
        </h1>
        <h6 class="font-normal text-xs">
          P-1, Poblacion 8, Buenavista, Agusan Del Norte
        </h6>
        <h6 class="font-normal text-xs italic">
          email address:
          <a
            href="mailto:evenparcorporation@gmail.com"
            class="italic text-green-600 dark:text-green-500 hover:underline"
            >evenparcorporation@gmail.com</a
          >
        </h6>
      </div>
      <div>
        <img
          class="w-24 h-16 dark:ring-gray-500 mx-auto block logo"
          src="/evenpar.jpg"
          alt="Evenpar Logo"
        />
      </div>
    </div>
    <div class="w-full">
      <form class="md:mt-0 mt-10">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <form action="" class="mt-5">
        <table
          class="w-full border-collapse border border-slate-300 table-fixed"
        >
          <tbody>
            <tr>
              <div class="flex justify-center border border-slate-300">
                <label
                  for="small-input"
                  class="flex text-lg font-medium text-blue-700 dark:text-white underline"
                  >PERSONNEL ACTION NOTICE</label
                >
              </div>
            </tr>

            <tr>
              <td colspan="3"></td>
              <td colspan="1" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >DATE</label
                  >
                  <input
                    type="date"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >EMPLOYEE:</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >EMPLOYEE NO.:</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >EFFECTIVE DATE:</label
                  >
                  <input
                    type="date"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="border border-slate-300">
                <div class="flex p-1">
                  <div class="space-x-2">
                    <input type="checkbox" id="1" value="1" />
                    <label
                      for="1"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >NEW HIRE</label
                    >
                    <input type="checkbox" id="2" value="2" />
                    <label
                      for="2"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >TERMINATION</label
                    >
                    <input type="checkbox" id="3" value="3" />
                    <label
                      for="3"
                      class="text-xs text-gray-900 dark:text-gray-300"
                      >TRANSFER</label
                    >
                    <input type="checkbox" id="4" value="4" />
                    <label
                      for="4"
                      class="text-xs text-gray-900 dark:text-gray-300"
                      >NEW RATE</label
                    >
                    <input type="checkbox" id="5" value="5" />
                    <label
                      for="5"
                      class="text-xs text-gray-900 dark:text-gray-300"
                      >BONUS</label
                    >
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="border border-slate-300">
                <div class="flex p-1">
                  <div class="space-x-2">
                    <input type="checkbox" id="6" value="6" />
                    <label
                      for="6"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >TITLE CHANGE*</label
                    >
                    <input type="checkbox" id="7" value="7" />
                    <label
                      for="7"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >LABOR CATEGORY CHANGE</label
                    >
                    <input type="checkbox" id="8" value="8" />
                    <label
                      for="8"
                      class="text-xs text-gray-900 dark:text-gray-300"
                      >OTHERS</label
                    >
                    <label
                      for=""
                      class="text-xs text-black dark:text-gray-300 italic"
                      >*Provide explanation in Comments/Explanations</label
                    >
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="4">
                <label
                  for="small-input"
                  class="flex text-md font-medium text-blue-700 dark:text-white"
                  >EMPLOYEE/NEW HIRE DATA</label
                >
              </td>
            </tr>

            <tr>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >SECTION:</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >DESIGNATION:</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >SALARY:</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="4" class="border border-slate-300">
                <div class="p-1">
                  <div class="space-x-2">
                    <input type="checkbox" id="exempt" value="1" />
                    <label
                      for="exempt"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >Exempt</label
                    >
                    <input type="checkbox" id="nonexempt" value="2" />
                    <label
                      for="nonexempt"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >Non-exempt</label
                    >
                    <label
                      for="nonexempt"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >Hire Source:</label
                    >
                    <input
                      type="text"
                      id="nonexempt"
                      value=""
                      class="inline w-42 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="border border-slate-300">
                <div class="p-1">
                  <div class="space-x-2">
                    <input type="checkbox" id="fulltime" value="1" />
                    <label
                      for="fulltime"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >Full-time</label
                    >
                    <input type="checkbox" id="parttime" value="2" />
                    <label
                      for="parttime"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >Part-time</label
                    >
                    <input type="checkbox" id="oncall" value="3" />
                    <label
                      for="oncall"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >Part-time/On-call</label
                    >
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="border border-slate-300">
                <div class="p-1">
                  <div class="space-x-2">
                    <label
                      for="nonexempt"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >Work Location:</label
                    >
                    <input
                      type="text"
                      id="nonexempt"
                      value=""
                      class="inline w-80 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <label
                  for="small-input"
                  class="flex text-md font-medium text-blue-700 dark:text-white"
                  >TRANSFER DATA</label
                >
              </td>
            </tr>
            <tr>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >From: (Sec./Loc.):</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >Approving Supervisor</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >To: (Sec./Loc.):</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >Approving Supervisor</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="4">
                <label
                  for="small-input"
                  class="flex w-full text-md font-medium text-blue-700 dark:text-white"
                  >SALARY, BONUS, TITLE CHANGES</label
                >
              </td>
            </tr>

            <tr>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                    >TYPE OF ADJUSTMENT</label
                  >
                </div>
              </td>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                    >PRESENT</label
                  >
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                    >PROPOSED</label
                  >
                </div>
              </td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-normal text-gray-900 dark:text-white"
                    >Semimonthly Salary (Full-time Exempt)</label
                  >
                </div>
              </td>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-normal text-gray-900 dark:text-white"
                    >Monthly Salary (Full-time Exempt)</label
                  >
                </div>
              </td>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-normal text-gray-900 dark:text-white"
                    >Annualized Salary (Full-time Exempt)</label
                  >
                </div>
              </td>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-normal text-gray-900 dark:text-white"
                    >Hourly Salary (Full-time Exempt)</label
                  >
                </div>
              </td>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-normal text-gray-900 dark:text-white"
                    >Bonus</label
                  >
                </div>
              </td>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="4">
                <label
                  for="small-input"
                  class="flex justify-center text-md font-medium text-blue-700 dark:text-white"
                  >TERMINATION DATA (See Attached Page)</label
                >
              </td>
            </tr>

            <tr>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >Type of Termination:</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >Reason for Termination:</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="inline mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >Eligible for Rehire:</label
                  >

                  <div class="space-x-2">
                    <input type="checkbox" id="yes" value="" />
                    <label
                      for="yes"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >Yes</label
                    >
                    <input type="checkbox" id="no" value="" />
                    <label
                      for="no"
                      class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                      >No</label
                    >
                  </div>
                </div>
              </td>
              <td colspan="2" class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                    >Last Day Worked:</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="4">
                <label
                  for="small-input"
                  class="flex justify-center text-md font-medium text-blue-700 dark:text-white"
                  >COMMENTS/EXPLANATIONS</label
                >
              </td>
            </tr>

            <tr>
              <td colspan="4" class="border border-slate-300 p-1">
                <div>
                  <input
                    type="text"
                    id="small-input"
                    placeholder="Comments and explanations here"
                    class="italic block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="4">
                <label
                  for="small-input"
                  class="flex justify-center text-md font-medium text-blue-700 dark:text-white"
                  >APPROVAL</label
                >
              </td>
            </tr>

            <tr>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                    >DATE</label
                  >
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                  ></label>
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for="small-input"
                    class="w-12 flex justify-center text-xs font-bold text-gray-900 dark:text-white"
                    >DATE</label
                  >
                </div>
              </td>
            </tr>

            <tr>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for=""
                    class="flex text-xs font-medium text-gray-900 dark:text-white"
                    >Immediate Head:</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="italic block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
              <td class="border border-slate-300 p-1 w-6">
                <div>
                  <input type="date" class="w-20 md:w-full" />
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div class="flex h-16">
                  <label
                    for=""
                    class="inline-block align-text-bottom text-xs pt-4 font-medium text-gray-900 dark:text-white"
                    >Director: <b>ENGR. RICHIE C. DALAUTA</b></label
                  >
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <input type="date" class="w-20 md:w-full" />
                </div>
              </td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for=""
                    class="inline-block align-text-bottom mt-8 text-xs font-medium text-gray-900 dark:text-white"
                    >HR Head: <b>JERMILY C. MOZO</b></label
                  >
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <input type="date" class="w-20 md:w-full" />
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div class="">
                  <label
                    for=""
                    class="inline-block align-text-bottom mt-8 text-xs font-medium text-gray-900 dark:text-white"
                    >Director: <b>ENGR. DIONISION JONAS A. RODES</b></label
                  >
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <input type="date" class="w-20 md:w-full" />
                </div>
              </td>
            </tr>
            <tr>
              <td class="border border-slate-300 p-1">
                <div>
                  <label
                    for=""
                    class="flex text-xs font-medium text-gray-900 dark:text-white"
                    >Director:</label
                  >
                  <input
                    type="text"
                    id="small-input"
                    class="italic block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <input type="date" class="w-20 md:w-full" />
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div class="">
                  <label
                    for=""
                    class="inline-block align-text-bottom mt-8 text-xs font-medium text-gray-900 dark:text-white"
                    >President: <b>ENGR. ANGEL A. ABRAU</b></label
                  >
                </div>
              </td>
              <td class="border border-slate-300 p-1">
                <div>
                  <input type="date" class="w-20 md:w-full" />
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="4">
                <label
                  for="small-input"
                  class="flex justify-center text-md font-medium text-blue-700 dark:text-white"
                  >EMPLOYEE SIGNATURE</label
                >
              </td>
            </tr>
            <tr>
              <td colspan="4" class="border border-slate-300 p-1">
                <div>
                  <input
                    type="text"
                    id="small-input"
                    class="italic block w-full p-1 text-gray-900 border-0 border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <label
                  for="small-input"
                  class="flex justify-center text-xs italic font-medium text-gray-900 dark:text-white"
                  >Name & Signature
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
  
</template>
