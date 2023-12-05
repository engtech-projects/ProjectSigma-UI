<template>
  <div
    class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg md:w-1/3 flex flex-col mx-auto"
  >
    <p class="text-xl font-normal text-gray-900 pb-5">
      User Accounts
    </p>
    <div >
      <form class="flex flex-col">
        <!-- <div class="mb-4">
          <label for="employee-name" class="block text-sm italic text-gray-600"
            >Employee ID</label
          ><input
            type="text"
            id="employee-id"
            name="employee-id"
            class="w-full border rounded px-3"
          />
        </div> -->
        <div class="mb-4 flex flex-col">
          <label for="employee-name" class="block text-sm italic text-gray-600"
            >First Name</label
          ><input
            type="text"
            id="employee-name"
            name="employee-name"
            class="w-full border rounded py-2 px-3"
            required
          />
        </div>
        <div class="mb-4">
          <label for="employee-name" class="block text-sm italic text-gray-600"
            >Middle Name</label
          ><input
            type="text"
            id="employee-name"
            name="employee-name"
            class="w-full border rounded py-2 px-3"
            required
          />
        </div>
        <div class="mb-4">
          <label for="employee-name" class="block text-sm italic text-gray-600"
            >Last Name</label
          ><input
            type="text"
            id="employee-name"
            name="employee-name"
            class="w-full border rounded py-2 px-3"
            required
          />
        </div>
        <div class="mb-4 flex flex-col">
          <label for="employee-name" class="block text-sm italic text-gray-600"
            >Extention</label
          >
          <select name="" id="">
            <option value="" selected>--Select--</option>
            <option value="">Jr</option>
            <option value="">Sr</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="employee-name" class="block text-sm italic text-gray-600"
            >Birthday</label
          ><input
            type="date"
            id="birthdate"
            name="birthdate"
            class="w-full border rounded py-2 px-3"
            required
          />
        </div>
        <div class="mb-4 flex flex-col">
          <label for="position" class="block text-sm italic text-gray-600"
            >Status</label
          >
          <select name="" id="">
            <option value="" selected>--Select--</option>
            <option value="">Single</option>
            <option value="">Married</option>
            <option value="">Widow</option>
          </select>
        </div>
        <div class="mb-4 flex flex-col">
          <label for="position" class="block text-sm italic text-gray-600"
            >Gender</label
          >
          <select name="" id="">
            <option value="" selected>--Select--</option>
            <option value="">Male</option>
            <option value="">Female</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="department" class="block text-sm italic text-gray-600"
            >Department</label
          ><input
            type="text"
            id="department"
            name="department"
            class="w-full border rounded py-2 px-3 "
            required
            
          />
        </div>
        <div class="mb-4">
          <label for="department" class="block text-sm italic text-gray-600"
            >Mobile Number</label
          ><input
            type="text"
            min="0"
            id="mobilenumber"
            name="mobilenumber"
            class="w-full border rounded py-2 px-3 "
            required
          />
        </div>
        <!-- <div class="mb-4">
          <label for="department" class="block text-sm italic text-gray-600"
            >Phone Number</label
          ><input
            type="text"
            min="0"
            id="phonenumber"
            name="phonenumber"
            class="w-full border rounded py-2 px-3 "
            required
          />
        </div> -->
        <div class="border-b w-full h-[14px] text-center p-3 mb-4">
          </div>
        <div class="mb-4">
          <label for="department" class="block text-sm italic text-gray-600"
            >Username</label
          ><input
            type="text"
            id="username"
            name="username"
            class="w-full border rounded py-2 px-3 "
            required
          />
        </div>
        <div class="mb-4">
          <label for="department" class="block text-sm italic text-gray-600"
            >Password</label
          ><input
            type="text"
            id="password"
            name="password"
            class="w-full border rounded py-2 px-3 "
            required
          />
        </div>
        <div class="mb-4">
          <label for="department" class="block text-sm italic text-gray-600"
            >Verify Password</label
          ><input
            type="text"
            id="verify_password"
            name="verify_password"
            class="w-full border rounded py-2 px-3 "
            required
          />
        </div>
        <div class="mb-4 flex flex-col">
          <label for="department" class="block text-sm italic text-gray-600"
            >Status</label
          >
          <select name="" id="">
            <option value="" selected>--Select--</option>
            <option value="">Active</option>
            <option value="">Inactive</option>
          </select>
          
        </div>
        
        <div class="flex mb-2 p-2 md:flex flex-col justify-end">
          <button
            type="submit"
            class="flex gap-1 justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-gray-900 dark:hover:bg-gray-800"
          >
          <Icon name="ic:baseline-get-app" class="w-5 h-5" color="white" />
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

