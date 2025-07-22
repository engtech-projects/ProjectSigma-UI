<script setup>
const compId = useId()
const showModal = defineModel("showModal", { required: false, type: Boolean, default: true })
defineProps({
    title: {
        type: String,
        default: "MODAL",
    },
    isLoading: {
        type: Boolean,
        default: false,
    }
})
const closeViewModal = () => {
    showModal.value = false
}
</script>
<template>
    <Teleport to="body">
        <div
            v-if="showModal"
            :id="'psModal-'+compId"
            class="w-full h-full bg-black bg-opacity-80 fixed top-0 left-0 flex justify-center items-center z-50"
            @click="closeViewModal()"
        >
            <div v-if="isLoading" class="absolute rounded-lg w-full h-full flex items-center justify-center" @click.stop>
                <img
                    class="flex justify-center w-28 rounded-md"
                    src="/loader.gif"
                    alt="logo"
                >
            </div>
            <div class="pb-2 max-w-[85%] min-w-[50%] max-h-[80%] min-h-[50%] bg-white rounded-md relative flex flex-col" @click.stop>
                <div class="basis-[10%] grow-1 shrink-0 flex items-center justify-between border-b rounded-t dark:border-gray-600">
                    <h3 v-if="title" class="pl-4 text-xl font-light text-gray-900 dark:text-white p-4">
                        {{ title }}
                    </h3>
                    <button
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white mr-4"
                        @click="closeViewModal()"
                    >
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <p class="sr-only">
                            Close modal
                        </p>
                    </button>
                </div>
                <div class="basis-[80%] grow-1 px-2 w-full max-w-full max-h-[80%] min-h-[80%] overflow-auto">
                    <slot name="body" />
                </div>
                <div class="basis-[10%] grow-1 shrink-0 h-full">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </Teleport>
</template>
<style scoped>

</style>
