<script setup>
const { signOut, data: userData } = useAuth()
</script>
<template>
    <div class="z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl">
        <div class="py-3 px-4">
            <span
                class="block text-sm font-semibold text-gray-900 dark:text-white"
            >
                {{ userData.type === "Administrator" ? userData.name : userData.employee.fullname_last }}
            </span>
            <span class="block text-sm text-gray-900 truncate dark:text-white">
                {{ userData.email }}
            </span>
        </div>
        <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
            <li>
                <NuxtLink
                    to="/hrms/setup/useraccountedit"
                    class="block py-2 px-4 text-sm dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white hover:bg-teal-400 hover:text-white"
                >
                    <span>Account settings</span>
                </NuxtLink>
            </li>
        </ul>
        <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
            <li>
                <a href="#" class="block py-2 px-4 text-sm dark:hover:bg-gray-600 dark:hover:text-white hover:bg-teal-400 hover:text-white" @click="signOut()">Sign out</a>
            </li>
        </ul>
    </div>
</template>
