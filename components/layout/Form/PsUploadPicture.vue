<script setup lang="ts">
import { useEmployeeInfo } from "@/stores/hrms/employee"

const snackbar = useSnackbar()
const employee = useEmployeeInfo()

const handleDocumentUpload = async (event: any) => {
    try {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append("file", file)
        await employee.saveEmployeeProfilePicture(formData)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
</script>
<template>
    <input
        id="floating_image_attachment"
        class="w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="image_attachment"
        type="file"
        accept="image/png, image/jpeg"
        required
        @change="handleDocumentUpload"
    >
</template>
