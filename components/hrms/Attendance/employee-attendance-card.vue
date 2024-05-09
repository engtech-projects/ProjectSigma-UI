<script setup>
defineProps({
    employeeLogs: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div class="bg-gray-100 flex gap-2 w-full  shadow-lg  border-2 border-gray-300">
        <div class="md:w-full flex-col justify-start py-2 px-4">
            <p class="text-3xl text-gray-700 font-bold mt-2">
                Juan Dela Cruz
            </p>
            <p class="text-lg font-light text-gray-500">
                Developer
            </p>
            <div class="flex gap-2">
                <p class="text-zinc-600 dark:text-zinc-300 w-full">
                    <span class="text-cyan-900 font-bold">
                        TIME-IN :
                    </span>
                    7:00 PM
                </p>
                <p class="text-zinc-600 dark:text-zinc-300 w-full">
                    <span class="text-cyan-900 font-bold">
                        TIME-OUT :
                    </span>
                    7:00 PM
                </p>
            </div>
            <div class="flex gap-2">
                <p class="text-zinc-600 dark:text-zinc-300 w-full">
                    <span class="text-cyan-900 font-bold">
                        TIME-IN :
                    </span>
                    7:00 PM
                </p>
                <p class="text-zinc-600 dark:text-zinc-300 w-full">
                    <span class="text-cyan-900 font-bold">
                        TIME-OUT :
                    </span>
                    7:00 PM
                </p>
            </div>
        </div>
    </div>
</template>
