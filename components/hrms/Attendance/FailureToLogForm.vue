<template>
  <div
    class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg w-full md:w-1/3"
  >
    <p class="text-xl font-normal text-gray-900 pb-5">
      Failure to Login / Logout form
    </p>
    <div>
      <form>
        <div class="mb-4">
          <img
            class="md:h-58 w-full bg-gray-400 rounded-lg"
            src="/avatarexample.png"
            alt="profile pic"
          />
          <div class="grid grid-cols-2 gap-2 mt-4">
            <div>
              <label
                for="text"
                class="block mb-2 text-sm font-normal italic text-gray-900"
                >Employee Name</label
              >
              <p class="text-xl">Juan Dela Cruz</p>
            </div>
            <div>
              <label
                for="text"
                class="block mb-2 text-sm font-normal italic text-gray-900"
                >Position</label
              >
              <p class="text-xl">Developer</p>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label for="log-date" class="block text-sm italic text-gray-600"
            >Date Filed</label
          ><input
            type="date"
            id="log-date"
            name="log-date"
            class="w-full border rounded py-2 px-3"
          />
        </div>
        <div class="mb-4">
          <label for="employee-name" class="block text-sm italic text-gray-600"
            >Employee Name</label
          ><input
            type="text"
            id="employee-name"
            name="employee-name"
            class="w-full border rounded py-2 px-3"
          />
        </div>
        <div class="mb-4">
          <label for="position" class="block text-sm italic text-gray-600"
            >Position</label
          ><input
            type="text"
            id="position"
            name="position"
            class="w-full border rounded py-2 px-3 bg-slate-200"
            disabled
          />
        </div>
        <div class="mb-4">
          <label for="department" class="block text-sm italic text-gray-600"
            >Department</label
          ><input
            type="text"
            id="department"
            name="department"
            class="w-full border rounded py-2 px-3 bg-slate-200"
            disabled
          />
        </div>
        <div class="mb-4">
          <label for="log-date" class="block text-gray-600">Log Date</label
          ><input
            type="date"
            id="log-date"
            name="log-date"
            class="w-full border rounded py-2 px-3"
          />
        </div>
        <div class="mb-4">
          <label for="reasons" class="block text-gray-600">Reason</label
          ><input
            type="text"
            id="reasons"
            name="reasons"
            class="w-full border rounded py-2 px-3"
          />
        </div>
        <div class="flex justify-end mb-2 p-2">
          <button
            type="submit"
            class="flex gap-2 justify-center text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-900 dark:hover:bg-gray-800"
          >
          <Icon name="ic:baseline-get-app" class="w-6 h-6" color="white" />
            Save Failure to Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
