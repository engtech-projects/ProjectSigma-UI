<template>
  <div class="border-2 p-2 rounded-lg shadow w-full  mb-4 "> 
          <label for="eventTitle" class="text-2xl font-medium">Create Employee</label>
          <div>
              <form action="" class=" gap-2 mt-2 grid grid-cols-3">
                  <div>
                      <label for="eventTitle" class="italic text-sm">Employee ID</label>
                      <input type="text" id="eventTitle" class="w-full rounded"/>
                  </div>
                  <div>
                      <label for="eventTitle" class="italic text-sm">Employee Last Name</label>
                      <input type="text" id="eventTitle" class="w-full rounded"/>
                  </div>
                  <div>
                      <label for="eventTitle" class="italic text-sm">Employee Name</label>
                      <input type="text" id="eventTitle" class="w-full rounded"/>
                  </div>
                  <div>
                      <label for="eventTitle" class="italic text-sm">Employee Name</label>
                      <input type="text" id="eventTitle" class="w-full rounded"/>
                  </div>

                  <div class="flex justify-end">
                      <button @click="addEvent" class="flex-1 text-white p-2 rounded bg-cyan-800 content-center">
                          <Icon name="ic:outline-people-alt" class="mr-2"/>Add Employee</button>
                  </div>
              </form>
          </div>
      </div>
</template>