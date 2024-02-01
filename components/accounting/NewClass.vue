<script lang="ts" setup>

</script>

<template>
    <LayoutBoards title="Create New Class" class="w-full h-fit">
        <form @submit.prevent="" action="">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="account_number"
                        class="text-xs italic"
                    >Class Name</label>
                    <input
                        id="accountNumber"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Class
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
