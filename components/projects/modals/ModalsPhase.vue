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
            <div class="flex items-center justify-between mb-16">
                <div class="flex items-end gap-2">
                    <h1 class="text-3xl uppercase">
                        Create Item
                    </h1>
                    <h3 class="text-gray-400 text-lg">
                        Item Creation
                    </h3>
                </div>
                <Icon name="material-symbols:close-rounded" class="h-6 w-6 text-gray-500 hover:text-gray-800 cursor-pointer" @click="emit('hideModal')" />
            </div>
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div class="flex flex-col">
                    <label class="text-md text-gray-700">
                        Item Name
                    </label>
                    <input type="text" class="border border-gray-300 rounded-md" placeholder="Project Name">
                </div>
                <div class="flex flex-col">
                    <label class="text-md text-gray-700">
                        Total Cost
                    </label>
                    <input type="text" class="border border-gray-300 rounded-md" disabled placeholder="0.00">
                </div>
            </div>
            <div class="flex flex-col mb-6">
                <label class="text-md text-gray-700">
                    Description
                </label>
                <textarea class="border border-gray-300 rounded-md w-full h-56 resize-none" />
            </div>
            <div class="flex justify-end">
                <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" @click="emit('hideModal')">
                    Create Item
                </button>
            </div>
        </div>
    </ModalContainer>
</template>

<script lang="ts" setup>
defineProps({
    showModal: {
        type: Boolean,
        required: true,
        default: false
    }
})
const emit = defineEmits(["hideModal"])
</script>

<style>

</style>
