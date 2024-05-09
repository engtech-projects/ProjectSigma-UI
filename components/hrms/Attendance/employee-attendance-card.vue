<template>
    <div class="bg-gray-100 flex gap-2 w-full  shadow-lg  border-2 border-gray-300">
        <div class="md:w-1/4">
            <img
                class="md:h-32 w-32 bg-gray-400"
                :src="'/avatarexample.png'"
                alt="profile pic"
            >
        </div>
        <div class="md:w-3/4 flex-col justify-start">
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
