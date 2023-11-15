<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 ">
    <div>
      <div class="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" action="#">
          <h5 class="text-2xl text-center font-medium text-gray-900 dark:text-white ">Personal Information</h5>
            <Avatar />
            
              <div class="grid gap-2 mb-6 md:grid-cols-3 text-sm">

                  <EmployeesEmployeeid />
                  
                  <div>
                      <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                      <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
                  </div>
                  <div>
                      <label for="middle_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle name</label>
                      <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required>
                  </div>
                  <div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                    <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required>
                  </div>
                  <div>
                      <label for="middle_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Suffix</label>
                      <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jr/Sr/I/II" required>
                  </div>
                  <div>
                      <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                      <input type="date" id="birthday" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mm/dd/yyy" required>
                  </div>  
                  <div>
                      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                      <select id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widow">Widow</option>
                      </select>
                  </div>
                  <div>
                      <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                      <select id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="single">Male</option>
                        <option value="married">Female</option>
                      </select>
                  </div>
                  <div>
                      <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile number</label>
                      <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09########" pattern="[0-9]{11}" required>
                  </div>
                  <div>
                      <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                      <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(085)341-0000" pattern="[0-9]{3}[0-9]{3}-[0-9]{4}" required>
                  </div>
                  
              </div>
          </form>
      </div>
    </div>
    <div>
      <div class="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form class="space-y-6" action="#">
              <h5 class="text-2xl text-center font-medium text-gray-900 dark:text-white">Employment Information</h5>
              <div class="grid gap-2 mb-6 md:grid-cols-2 text-sm">
                  <div>
                      <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                      <select id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="" disabled selected>-- SELECT --</option>
                        <option value="hr">Human Resources Department</option>
                        <option value="accounting">Accounting Department</option>
                        <option value="finance">Finance Department</option>
                        <option value="it">Information Support Department</option>
                        <option value="do">Directors Office</option>
                      </select>
                  </div>
                  <div>
                      <label for="datehired" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Hired</label>
                      <input type="date" id="datehired" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mm/dd/yyy" required>
                  </div>
                  <div>
                      <label for="rate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rate</label>
                      <input type="number" min="0" id="rate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required>
                  </div>
                  <div>
                      <label for="jobtitle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
                      <input type="text" id="jobtitle" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                  </div>
                  <div>
                      <label for="employment_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employment Type</label>
                      <select id="employment_type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="" disabled selected>-- SELECT --</option>
                        <option value="single">Contractual</option>
                        <option value="married">Part-time</option>
                        <option value="divorced">Probationary</option>
                        <option value="widow">Project Based</option>
                        <option value="widow">Regular</option>
                      </select>
                  </div>
              </div>
          </form>
      </div>

      <Buttons />

    </div>
  </div>
</template>