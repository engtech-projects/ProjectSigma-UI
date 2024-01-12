<template>
    <div class="md:grid grid-cols-2 gap-2">
        <section class="bg-gray-50 dark:bg-gray-900 mb-4">
            <div
                class="flex flex-col items-center justify-center mx-auto lg:py-0"
            >
                <div
                    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border-t-4 border-teal-400"
                >
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                        <img class="w-20 h-20 mx-auto rounded-xl" src="/evenpar.jpg" alt="logo">
                        <SearchBar />
                        <div class="border-b w-full h-[14px] text-center p-3 mt-2 mb-7">
                            <span class="text-md bg-white text-black px-3 italic">
                                User Account Setup
                            </span>
                        </div>

                        <form
                            class="space-y-4 md:space-y-6"
                            action="#"
                            @submit.prevent="register"
                        >
                            <div>
                                <label
                                    for="username"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Username</label>
                                <input
                                    id="username"
                                    type="username"
                                    name="username"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="johndoe123"
                                    required
                                >
                            </div>
                            <div>
                                <label
                                    for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                >
                            </div>
                            <div class="flex items-center justify-between">
                                <a
                                    href="#"
                                    class="text-sm font-medium ml-auto text-primary-600 hover:underline dark:text-primary-500"
                                >Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                class="w-full text-white bg-cyan-600 hover:bg-secondary-base focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-gray-50 dark:bg-gray-900">
            <div
                class="flex flex-col items-center justify-center mx-auto lg:py-0 "
            >
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700  border-t-4 border-teal-400">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                        <div class="border-b w-full h-[14px] text-center mb-2 ">
                            <span class="text-md bg-white text-black px-3 italic">
                                User Accessibility
                            </span>
                        </div>
                        <div class="grid grid-cols-2 justify-between overflow-auto h-96">
                            <div class="items-center ">
                                <label for="default-checkbox" class="ms-2 text-md font-medium text-green-400 dark:text-green-300">HRMS</label>

                                <div class="grid grid-cols-1 space-y-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Dashboard</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Announcement</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Event Calendar</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Leave</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Loans</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Overtime</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Cash Advance</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Reports</span>
                                    </label>
                                </div>

                                <label for="default-checkbox" class="ms-2 text-md font-medium text-green-400 dark:text-green-300">ATTENDANCE</label>

                                <div class="grid grid-cols-1 space-y-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Attendance Portal</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Daily Logs Record</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Failure to Login</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Face Recognition</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Attendance Login</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">QR Code</span>
                                    </label>
                                </div>
                                <label for="default-checkbox" class="ms-2 text-md font-medium text-green-400 dark:text-green-300">EMPLOYEE</label>
                                <div class="grid grid-cols-1 space-y-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">201</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">PAN</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Onboarding</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Manpower Request</span>
                                    </label>
                                </div>
                            </div>

                            <div class="items-center mb-4">
                                <label for="default-checkbox" class="ms-2 text-md font-medium text-green-400 dark:text-green-300">SETUP</label>
                                <div class="grid grid-cols-1 space-y-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">User Accounts</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Department</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Approvals</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">HMO</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">PhilHealth</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Pag-Ibig</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">SSS</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Withholding Tax</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Leaves</span>
                                    </label>
                                </div>
                                <label for="default-checkbox" class="ms-2 text-md font-medium text-green-400 dark:text-green-300">PAYROLL</label>
                                <div class="grid grid-cols-1 space-y-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Generate Payroll</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">13th Month Pay</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Allowance</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Payroll Record</span>
                                    </label>
                                </div>
                                <label for="default-checkbox" class="ms-2 text-md font-medium text-green-400 dark:text-green-300">SCHEDULE</label>
                                <div class="grid grid-cols-1 space-y-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Department Sched</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Employee Sched</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Project Sched</span>
                                    </label>
                                    <label class="relative inline-flex items-center w-full cursor-pointer">
                                        <input type="checkbox" value="" class="sr-only peer">
                                        <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-teal-600" />
                                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 italic">Payroll Record</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>

definePageMeta({
    layout: "default",
}),
useHead({
    title: "User Accounts",
    meta: [{ name: "description", content: "" }],
})
</script>
