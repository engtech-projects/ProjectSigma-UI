<script setup>
defineProps({
    employeeLogs: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div class="bg-gray-100 flex gap-2 w-full shadow-lg border-2 border-gray-300 rounded-lg p-4">
        <div class="md:w-1/4">
            <img
                class="md:h-32 w-32 bg-gray-400 rounded-lg"
                :src="'/avatarexample.png'"
                alt="profile pic"
            >
        </div>
        <div class="md:w-3/4 flex flex-col justify-start">
            <p class="text-3xl text-gray-700 font-bold mt-2">
                Juan Dela Cruz
            </p>
            <p class="text-lg font-light text-gray-500">
                Developer
            </p>
            <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <p class="text-zinc-600 dark:text-zinc-300">
                        <span class="text-cyan-900 font-bold">TIME-IN :</span> 7:00 AM
                    </p>
                    <p class="text-zinc-600 dark:text-zinc-300">
                        <span class="text-cyan-900 font-bold">TIME-OUT :</span> 4:00 PM
                    </p>
                </div>
                <div>
                    <p class="text-zinc-600 dark:text-zinc-300">
                        <span class="text-cyan-900 font-bold">TIME-IN :</span> 7:00 AM
                    </p>
                    <p class="text-zinc-600 dark:text-zinc-300">
                        <span class="text-cyan-900 font-bold">TIME-OUT :</span> 4:00 PM
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
