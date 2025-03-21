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
            <div class="flex mb-16 items-end gap-2">
                <h1 class="text-3xl uppercase">
                    Create Position
                </h1>
                <h3 class="text-gray-400 text-lg">
                    Position Creation
                </h3>
            </div>
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div class="flex flex-col">
                    <label class="text-md text-gray-700">
                        Resource Name
                    </label>
                    <input type="text" class="border border-gray-300 rounded-md" placeholder="Resource Name">
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
                    Create Position
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
