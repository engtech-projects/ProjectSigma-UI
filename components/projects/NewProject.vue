<template>
    <LayoutBoards title="Project List" class="w-96 h-52 p-4">
        <div class="text-gray-500 mt-2">
            <form @submit.prevent="">
                <div class="space-y-2">
                    <label
                        for="departmentName"
                        class="text-xs italic"
                    >Project Name</label>
                    <input
                        id="departmentName"
                        type="text"
                        class="w-full rounded-lg"
                    >
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5 hover:bg-teal-500 active:bg-teal-700"
                    >
                        <Icon name="material-symbols:business-center" class="mr-2" />Add Project
                    </button>
                </div>
            </form>
            <p class="text-red-600 text-center font-semibold" />
            <p
                v-show="successMessage"
                class="text-green-600 text-center font-semibold"
            />
        </div>
    </LayoutBoards>
</template>
