<script setup lang="ts">
defineProps({
    showModal: {
        type: Boolean,
        required: true,
        default: false
    },
    isEdit: {
        type: Boolean,
        required: false,
        default: false
    },
})
const emit = defineEmits(["hideModal"])
</script>
<template>
    <ModalContainer
        :show="showModal"
        :local="true"
        :header="false"
        bg="bg-gray-50"
        size="modal-lg"
        @hide="emit('hideModal')"
    >
        <div class="flex flex-col p-4">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-end gap-2">
                    <h1 class="text-2xl uppercase">
                        Create Work Schedule
                    </h1>
                </div>
                <Icon name="material-symbols:close-rounded" class="h-6 w-6 text-gray-500 hover:text-gray-800 cursor-pointer" @click="emit('hideModal')" />
            </div>

            <form @submit.prevent="emit('hideModal')">
                <div class="grid grid-cols-2 gap-6 mb-4">
                    <div class="flex flex-col">
                        <label class="text-sm text-gray-700 mb-2">
                            Date Start
                        </label>
                        <input
                            type="date"
                            class="border border-gray-300 rounded-md"
                            placeholder="Item Name"
                            required
                        >
                    </div>
                    <div class="flex flex-col">
                        <label class="text-sm mb-1 text-gray-700">
                            Date End
                        </label>
                        <input
                            type="date"
                            class="border border-gray-300 rounded-md"
                            placeholder="0.00"
                            required
                        >
                    </div>
                </div>
                <div class="flex justify-end">
                    <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </ModalContainer>
</template>
