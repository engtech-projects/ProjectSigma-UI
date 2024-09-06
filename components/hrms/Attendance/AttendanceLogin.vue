<script setup lang="ts">
const { signIn } = useAuth()
definePageMeta({
    layout: "guest",
    auth: {
        unauthenticatedOnly: false,
    },
})
useHead({
    title: "Attendance Login",
    meta: [{ name: "description", content: "" }],
    bodyAttrs: {
        class: "attendance",
    },
})
</script>
<template>
    <div>
        <section class="bg-gray-50 dark:bg-gray-900">
            <div
                class="flex flex-col items-center justify-center mx-auto lg:py-0"
            >
                <div
                    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                >
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                        <img class="w-20 h-20 mx-auto rounded-xl" src="/evenpar.jpg" alt="logo">
                        <SearchBar />
                        <div class="border-b w-full h-[14px] text-center p-3 mt-2 mb-7">
                            <span class="text-md bg-white text-black px-3 italic">
                                Setup Attendance User Login
                            </span>
                        </div>

                        <form
                            class="space-y-4 md:space-y-6"
                            action="#"
                            @submit.prevent="signIn"
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
    </div>
</template>
