<script setup lang="ts">
defineProps({
    showModal: {
        type: Boolean,
        required: true,
        default: false
    },
    stage: {
        type: String,
        required: true,
        default: ""
    }
})
const emit = defineEmits(["hideModal", "update-stage"])
const showAddModal = ref(false)
</script>
<template>
    <ModalContainer
        :show="showModal"
        :local="true"
        :header="false"
        bg="bg-gray-50"
        size="modal-md"
        @hide="emit('hideModal')"
    >
        <div v-if="!showAddModal" class="bg-white w-full p-6 transition-transform scale-100">
            <!-- Header -->
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
                Confirm Stage Update
            </h2>
            <!-- Message -->
            <p class="text-gray text-600 text-xl mb-6 py-4">
                Are you sure you want to update the stage to {{ stage }}?
            </p>

            <!-- Actions -->
            <div class="flex justify-end space-x-4">
                <button
                    class="px-8 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    @click="$emit('hideModal')"
                >
                    No
                </button>
                <button
                    class="px-8 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    @click="$emit('update-stage')"
                >
                    Yes
                </button>
            </div>
        </div>
    </ModalContainer>
</template>
