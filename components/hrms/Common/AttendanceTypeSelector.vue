<script setup>
const attendanceType = defineModel("attendanceType", { required: false, type: String, default: "all" })
</script>
<template>
    <select v-model="attendanceType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option :value="null" disabled selected>
            Choose Attendance Type
        </option>
        <option value="all">
            All
        </option>
        <option value="Facial">
            Facial
        </option>
        <option value="QR Code">
            QR Code
        </option>
    </select>
</template>
