<script setup>
const { data: userData } = useAuth()
const profilePhoto = computed(() => {
    if (!userData.value) {
        return "/avatarexample.png"
    }
    if (userData.value.employee?.profile_photo && userData.value.employee?.profile_photo.base64 !== "File doesn't exists.") {
        return userData.value.employee.profile_photo.base64
    }
    if (userData.value.type === "Administrator") {
        return "/admin_photo.png"
    }
    return "/avatarexample.png"
})
</script>
<template>
    <button
        type="button"
        data-dropdown-toggle="user-menu-button"
        class="text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    >
        <span class="sr-only">Open user menu</span>
        <img
            class="w-12 h-12 rounded-full"
            :src="profilePhoto"
            alt="User Photo"
        >
    </button>
</template>
