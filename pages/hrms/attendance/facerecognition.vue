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
    <div class="shadow-md p-4 mt-10 md:mt-0 bg-white mb-3 border border-gray-300 rounded-lg w-full md:w-3/5 flex flex-col justify-center mx-auto">
        <p class="flex gap-3 justify-center mx-auto text-2xl text-center font-medium text-gray-900 dark:text-white p-2">
            <Icon
                name="material-symbols-light:familiar-face-and-zone"
                color="black"
                class="w-8 h-8"
            /> Setup Face Recognition
            <!-- <img class="w-8 flex justify-center items-center mx-auto" src="/evenpar.jpg" alt="logo" /> -->
        </p>
        <div>
            <HrmsAttendanceFaceDetection />
        </div>
    </div>
</template>
