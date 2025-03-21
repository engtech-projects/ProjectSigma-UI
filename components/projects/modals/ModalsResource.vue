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
            <div class="flex items-end gap-2 mb-4">
                <h1 class="text-3xl uppercase">
                    Create Resource
                </h1>
                <h3 class="text-gray-400 text-lg">
                    Resource Creation
                </h3>
            </div>
            <div class="flex gap-4 items-center mb-10">
                <label class="text-md text-gray-700 uppercase text-md">
                    Category Name
                </label>
                <h3 class="text-green-600 text-lg">
                    A.Materials
                </h3>
            </div>
            <div class="grid grid-cols-2 gap-6 mb-4">
                <div class="flex flex-col">
                    <label class="text-md text-gray-700">
                        Project Name
                    </label>
                    <input type="text" class="border border-gray-300 rounded-md" placeholder="Project Name">
                </div>
                <div class="flex flex-col">
                    <label class="text-md text-gray-700">
                        Total Cost
                    </label>
                    <input type="text" class="border border-gray-300 rounded-md" placeholder="0.00">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mb-4">
                <div class="flex flex-col">
                    <label class="text-md text-gray-700">
                        Quantity
                    </label>
                    <input type="text" class="border border-gray-300 rounded-md" placeholder="0.00">
                </div>
                <div class="flex flex-col">
                    <label class="text-md text-gray-700">
                        Unit
                    </label>
                    <input type="text" class="border border-gray-300 rounded-md" placeholder="0.00">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mb-4">
                <div class="flex flex-col">
                    <label class="text-md text-gray-700">
                        Unit Price
                    </label>
                    <input type="text" class="border border-gray-300 rounded-md" placeholder="0.00">
                </div>
                <div class="flex flex-col">
                    <label class="text-md text-gray-700">
                        Amount
                    </label>
                    <input type="text" class="border border-gray-300 rounded-md" placeholder="0.00">
                </div>
            </div>
            <div class="flex flex-col mb-4">
                <label class="text-md text-gray-700">
                    Description
                </label>
                <textarea class="border border-gray-300 rounded-md w-full h-56 resize-none" />
            </div>
            <div class="flex justify-end">
                <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" @click="emit('hideModal')">
                    Create Resource
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
