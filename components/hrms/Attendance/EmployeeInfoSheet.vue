<template>
    <div>
        <div
            class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg w-full"
        >
            <p class="flex justify-center text-2xl font-normal text-gray-900 pb-5 antialiased tracking-wide">
                Employee
            </p>

            <div class="mb-4">
                <SearchBar />
            </div>

            <div>
                <div class="space-y-6 mb-4" action="#">
                    <img
                        class="md:h-58 w-full bg-gray-400 rounded-lg"
                        src="/avatarexample.png"
                        alt="profile pic"
                    >
                    <div class="flex gap-20 ">
                        <div>
                            <p class="text-xl font-bold">
                                Juan Dela Cruzsss
                            </p>
                            <label
                                for="text"
                                class="block mb-2 text-sm font-medium italic text-teal-700"
                            >Employee Name</label>
                        </div>
                        <div>
                            <p class="text-xl font-bold">
                                Developer
                            </p>
                            <label
                                for="text"
                                class="block mb-2 text-sm font-medium italic text-teal-700"
                            >Position</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
