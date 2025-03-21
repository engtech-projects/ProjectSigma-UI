<template>
    <ModalContainer
        :show="showModal"
        :local="true"
        :header="false"
        bg="bg-gray-50"
        size="modal-lg"
        @hide="emit('hideModal')"
    >
        <div v-if="!showAddModal" class="flex flex-col p-4">
            <div class="flex justify-left gap-4">
                <div class="flex flex-col mb-16 items-start gap-2">
                    <h1 class="text-3xl uppercase">
                        Add Category
                    </h1>
                    <h3 class="text-gray-400 text-lg">
                        Category Creation
                    </h3>
                </div>
                <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-10 h-10" @click="showAddModal = true">
                    +
                </button>
            </div>
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div class="flex flex-col col-span-2 gap-1">
                    <label class="text-sm text-gray-700">
                        Category List
                    </label>
                    <select id="category" name="category" class="border border-gray-300 rounded-md">
                        <option value="" disabled>
                            Select Category
                        </option>
                    </select>
                </div>
            </div>
            <div class="flex justify-end">
                <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" @click="emit('hideModal')">
                    Add Category
                </button>
            </div>
        </div>
        <div v-else class="flex flex-col p-4">
            <div class="flex justify-left gap-4">
                <div class="flex flex-col mb-16 items-start gap-2">
                    <h1 class="text-3xl uppercase">
                        Create Category Name
                    </h1>
                    <h3 class="text-gray-400 text-lg">
                        Category Creation
                    </h3>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div class="flex flex-col col-span-1 gap-1">
                    <label class="text-sm text-gray-700">
                        Category Name
                    </label>
                    <input type="text" class="border border-gray-300 rounded-md" placeholder="Category Name">
                </div>
            </div>
            <div class="flex flex-col mb-6">
                <label class="text-md text-gray-700">
                    Description
                </label>
                <textarea class="border border-gray-300 rounded-md w-full h-56 resize-none" />
            </div>
            <div class="flex justify-end gap-3">
                <button class="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 select-none text-white rounded-lg text-sm w-36 h-10" @click="showAddModal = false">
                    Cancel
                </button>
                <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 select-none text-white rounded-lg text-sm w-36 h-10" @click="emit('hideModal')">
                    Create Category
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
const showAddModal = ref(false)
</script>

<style>

</style>
