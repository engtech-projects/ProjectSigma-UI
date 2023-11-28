<template>
  <div>
    <div
      class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg w-full"
    >
      <p class="text-xl font-normal text-gray-900 pb-5">
        Employee Information Sheet
      </p>
      
      <div class="mb-4">
        <SearchBar />
      </div>

      <div>
        <form class="space-y-6" action="#">
          <img
            class="md:h-58 w-full bg-gray-400 rounded-lg"
            src="/avatarexample.png"
            alt="profile pic"
          />
          <div class="grid grid-cols-2 gap-2">
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

          <div>
            <label
              for="text"
              class="block mb-2 text-xl font-medium text-gray-900"
              >Biometrics</label
            ><input
              type="text"
              name="biometrics"
              id="biometrics"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
              placeholder="Biometrics"
              required=""
            />
          </div>
          <div class="flex justify-end mb-2 p-2">
            <button
              type="submit"
              class="flex gap-2 justify-center text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-900 dark:hover:bg-gray-800"
            >
            <Icon name="ic:baseline-fingerprint" class="w-6 h-6" color="white" />
              Update Biometrics
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
