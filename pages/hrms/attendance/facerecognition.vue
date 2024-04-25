<script setup lang="ts">
useHead({
    title: "Face Login",
    meta: [{ name: "description", content: "" }],
    bodyAttrs: {
        class: "login",
    },
})

</script>

<template>
    <div class="w-full flex gap-2">
        <div class="w-full md:w-1/3">
            <HrmsEmployee201SearchProfile />
        </div>
        <div class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg md:w-2/3 w-full">
            <p class="flex gap-3 justify-center text-2xl font-medium text-gray-900 dark:text-white p-2 border-gray-800 border-b-2">
                <Icon
                    name="material-symbols-light:familiar-face-and-zone"
                    color="black"
                    class="w-8 h-8"
                /> Setup Face Recognition
            </p>
            <div>
                <HrmsAttendanceFaceDetection />
            </div>
        </div>
    </div>
</template>
